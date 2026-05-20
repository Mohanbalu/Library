# Postman Testing Guide

## Base URL
`http://localhost:8080`

## JWT Header
Use this header after login:

```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## 1) Register
**POST** `/api/auth/register`

Request:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Password@123",
  "phoneNumber": "9999999999"
}
```

Sample response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "role": "USER",
    "message": "User registered successfully"
  }
}
```

## 2) Login
**POST** `/api/auth/login`

Request:
```json
{
  "email": "john@example.com",
  "password": "Password@123"
}
```

Sample response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "role": "USER",
    "message": "Login successful"
  }
}
```

## 3) Add Book
**POST** `/api/books`

Request:
```json
{
  "title": "Clean Code",
  "isbn": "9780132350884",
  "quantity": 5,
  "description": "A handbook of agile software craftsmanship",
  "shelfLocation": "A-12",
  "categoryId": 1,
  "authorId": 1
}
```

## 4) Issue Book
**POST** `/api/issues/issue`

Request:
```json
{
  "userId": 1,
  "bookId": 1,
  "dueDate": "2026-06-03"
}
```

## 5) Return Book
**POST** `/api/issues/return`

Request:
```json
{
  "issuedBookId": 1
}
```

## 6) Pay Fine
**POST** `/api/fines/pay/1`

## 7) Get Transactions
**GET** `/api/transactions`

## 8) User Transactions
**GET** `/api/transactions/user/1`

## Sample 200 Response Pattern
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": []
}
```

## Notes
- Send the JWT token in every protected request.
- The token must use the `Bearer <token>` format.
- Set `Content-Type` to `application/json` for all POST and PUT requests.
