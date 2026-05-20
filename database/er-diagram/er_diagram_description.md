# Smart Library Book Issue & Return Management System

## 1. Database Design Overview

The schema uses a normalized relational model for MySQL and separates identity, catalog, circulation, fine management, and audit history.

- `roles` defines access levels such as `ADMIN` and `USER`.
- `users` stores authentication and profile data and links each account to one role.
- `categories` and `authors` are master tables for catalog classification.
- `books` stores title-level metadata.
- `book_copies` stores physical inventory and copy-level availability.
- `book_authors` resolves the many-to-many relationship between books and authors.
- `issued_books` records each circulation event.
- `fines` stores overdue fine calculation and payment state.
- `transactions` stores permanent circulation and payment history.

## 2. Table Relationship Explanation

- One `role` can belong to many `users`.
- One `category` can contain many `books`.
- One `book` can have many `book_copies`.
- One `book` can have many `authors`, and one `author` can write many `books` through `book_authors`.
- One `book_copy` can be issued many times over time, but only one active issue should exist at a time.
- One `user` can issue many books.
- One `issued_books` row belongs to one `user` and one `book_copy`.
- One `issued_books` row can produce at most one `fine`.
- One `issued_books` row can generate multiple `transactions` for issue, return, and fine payment history.

## 3. ER Relationship Summary

- `roles` 1 --- N `users`
- `categories` 1 --- N `books`
- `books` 1 --- N `book_copies`
- `books` N --- N `authors` via `book_authors`
- `users` 1 --- N `issued_books`
- `book_copies` 1 --- N `issued_books`
- `issued_books` 1 --- 0..1 `fines`
- `issued_books` 1 --- N `transactions`
- `fines` 1 --- N `transactions` for payment-related rows

## 4. Complete MySQL CREATE TABLE Queries

The full DDL is split across these files for clean deployment order:

- [database/schema/create_tables.sql](../schema/create_tables.sql)
- [database/constraints.sql](../constraints.sql)
- [database/indexes.sql](../indexes.sql)

## 5. Foreign Key Explanations

- `users.role_id` references `roles.role_id` to enforce role-based access.
- `books.category_id` references `categories.category_id` to keep classification valid.
- `book_copies.book_id` references `books.book_id` to attach copies to a title.
- `book_authors.book_id` and `book_authors.author_id` implement the many-to-many book-author model.
- `issued_books.copy_id` references `book_copies.copy_id` so circulation is tracked per physical copy.
- `issued_books.user_id` references `users.user_id` to identify the borrower.
- `issued_books.issued_by_user_id` and `returned_by_user_id` preserve staff auditability.
- `fines.issue_id` references `issued_books.issue_id` so each fine belongs to a specific issue record.
- `transactions.issue_id` references `issued_books.issue_id` to keep a permanent history of issue and return activity.
- `transactions.fine_id` references `fines.fine_id` for payment-related rows.

## 6. Suggested Indexes

The most important performance indexes are defined in [database/indexes.sql](../indexes.sql). Key ones include:

- Unique lookups for `users.email`, `users.username`, and `users.library_card_no`.
- Lookup indexes on `books.category_id`, `book_copies.book_id`, and `issued_books.user_id`.
- Status and date indexes for circulation, overdue processing, and reporting.
- Payment and transaction indexes for analytics and audit queries.

## 7. Sample Seed Data

Seed files are provided for quick local setup and testing:

- [database/seed/sample_users.sql](../seed/sample_users.sql)
- [database/seed/sample_books.sql](../seed/sample_books.sql)
- [database/seed/sample_transactions.sql](../seed/sample_transactions.sql)

## 8. Folder Structure

```text
database/
├── schema/
│   ├── create_tables.sql
│   ├── constraints.sql
│   └── indexes.sql
├── seed/
│   ├── sample_users.sql
│   ├── sample_books.sql
│   └── sample_transactions.sql
└── er-diagram/
    └── er_diagram_description.md
```

## ER Notes

The design is suitable for Spring Boot JPA/Hibernate because it uses stable primary keys, explicit foreign keys, normalized junction tables, soft delete columns on master data, and audit timestamps on all mutable entities. Inventory availability is represented at the copy level, which avoids ambiguity when multiple physical copies exist for a single title.