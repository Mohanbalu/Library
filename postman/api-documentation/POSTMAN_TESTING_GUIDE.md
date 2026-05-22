# POSTMAN TESTING GUIDE

## Project
Smart Library Book Issue & Return Management System

## Overview
This guide describes how to import Postman collections, configure the environment, validate JWT authentication, and execute API testing for the backend Spring Boot service.

## 1. Importing Collections
1. Open Postman.
2. Select **Import**.
3. Choose the file import option and select the JSON files from `postman/collections/`.
4. Import the environment file `postman/environments/local_environment.json`.
5. Select the imported environment from the top-right environment dropdown.

## 2. Environment Setup
Required environment variables in `local_environment.json`:
- `base_url`: `http://localhost:8080/api`
- `jwt_token`: blank initially; saved after login
- `admin_email`: `admin@example.com`
- `admin_password`: `Password@123`
- `user_id`, `book_id`, `issued_book_id`, `fine_id`: populated automatically during tests

## 3. Authentication Flow
1. Run **Auth APIs > Register User**.
2. Run **Auth APIs > Login User**.
3. The login test script saves the JWT token to `{{jwt_token}}`.
4. All protected requests use `Bearer {{jwt_token}}` automatically from the collection auth settings.

## 4. JWT Testing
- Use **Invalid JWT Token Test** to verify unauthorized access with an invalid token.
- Use **Missing Authorization Header Test** to verify requests fail without `Authorization`.
- Confirm `{{jwt_token}}` is stored after login before running protected collections.

## 5. API Testing Order
Recommended execution order:
1. `Auth APIs`
   - Register User
   - Login User
   - Invalid Login Test
   - Duplicate Email Test
2. `Book APIs`
   - Add Book
   - Get All Books
   - Get Book By ID
   - Update Book
   - Search Books
   - Delete Book
   - Duplicate ISBN Test
   - Invalid JWT Token Test
   - Missing Authorization Header Test
3. `User APIs`
   - Get All Users
   - Get User By ID
   - Update User
   - Delete User
4. `Issue & Return APIs`
   - Issue Book
   - Get Issued Books
   - Return Book
   - Invalid Issue Request
   - Book Unavailable Test
   - Invalid Return Request
5. `Fine APIs`
   - Get All Fines
   - Pay Fine
6. `Transaction APIs`
   - Get All Transactions
   - Get User Transactions

## 6. Test Script Validation
Each request includes Postman test scripts to validate:
- status codes: `200`, `201`, `400`, `401`, `403`, `404`
- response times under `5000ms`
- response structure and required payload fields
- authentication and authorization failures

## 7. Common Errors
- `401 Unauthorized`: JWT token missing, expired, invalid, or not attached.
- `403 Forbidden`: insufficient permissions for protected endpoint.
- `400 Bad Request`: invalid request payload or business validation failure.
- `404 Not Found`: resource does not exist or invalid path variable.
- `409 Conflict`: duplicate data such as email or ISBN.

## 8. Expected Responses
- `POST /auth/register`: `201 Created` or `200 OK`
- `POST /auth/login`: `200 OK` with JWT token
- `POST /books`: `201 Created`
- `GET /books`: `200 OK`
- `GET /books/{id}`: `200 OK`
- `PUT /books/{id}`: `200 OK`
- `DELETE /books/{id}`: `200 OK` or `204 No Content`
- `POST /issues/issue`: `201 Created` or `200 OK`
- `POST /issues/return`: `200 OK`
- `GET /fines`: `200 OK`
- `POST /fines/pay/{fineId}`: `200 OK`
- `GET /transactions`: `200 OK`
- `GET /transactions/user/{userId}`: `200 OK`

## 9. Notes
- Ensure the Spring Boot backend is running at `http://localhost:8080` before executing tests.
- Use the environment variable `{{base_url}}` for all requests to make the collection portable.
- Update `admin_email` and `admin_password` only if backend credentials differ.
