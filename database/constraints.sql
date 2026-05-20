-- Smart Library Book Issue & Return Management System
-- Apply this file after create_tables.sql.

ALTER TABLE users
    ADD CONSTRAINT fk_users_role
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE books
    ADD CONSTRAINT fk_books_category
    FOREIGN KEY (category_id) REFERENCES categories (category_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE book_copies
    ADD CONSTRAINT fk_book_copies_book
    FOREIGN KEY (book_id) REFERENCES books (book_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE book_authors
    ADD CONSTRAINT fk_book_authors_book
    FOREIGN KEY (book_id) REFERENCES books (book_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    ADD CONSTRAINT fk_book_authors_author
    FOREIGN KEY (author_id) REFERENCES authors (author_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE issued_books
    ADD CONSTRAINT fk_issued_books_copy
    FOREIGN KEY (copy_id) REFERENCES book_copies (copy_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    ADD CONSTRAINT fk_issued_books_user
    FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    ADD CONSTRAINT fk_issued_books_issued_by_user
    FOREIGN KEY (issued_by_user_id) REFERENCES users (user_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
    ADD CONSTRAINT fk_issued_books_returned_by_user
    FOREIGN KEY (returned_by_user_id) REFERENCES users (user_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
    ADD CONSTRAINT chk_issued_books_due_date
    CHECK (due_date >= issue_date),
    ADD CONSTRAINT chk_issued_books_return_date
    CHECK (return_date IS NULL OR return_date >= issue_date),
    ADD CONSTRAINT chk_issued_books_renewal_count
    CHECK (renewal_count >= 0);

ALTER TABLE fines
    ADD CONSTRAINT fk_fines_issue
    FOREIGN KEY (issue_id) REFERENCES issued_books (issue_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    ADD CONSTRAINT chk_fines_amount
    CHECK (fine_amount >= 0),
    ADD CONSTRAINT chk_fines_rate
    CHECK (fine_rate_per_day >= 0),
    ADD CONSTRAINT chk_fines_overdue_days
    CHECK (overdue_days >= 0);

ALTER TABLE transactions
    ADD CONSTRAINT fk_transactions_issue
    FOREIGN KEY (issue_id) REFERENCES issued_books (issue_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    ADD CONSTRAINT fk_transactions_fine
    FOREIGN KEY (fine_id) REFERENCES fines (fine_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    ADD CONSTRAINT fk_transactions_user
    FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    ADD CONSTRAINT fk_transactions_processed_by_user
    FOREIGN KEY (processed_by_user_id) REFERENCES users (user_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
    ADD CONSTRAINT chk_transactions_amount
    CHECK (amount >= 0);