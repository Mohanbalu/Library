-- Smart Library Book Issue & Return Management System
-- Additional performance indexes.

CREATE INDEX idx_users_role_id ON users (role_id);
CREATE INDEX idx_users_status ON users (status);
CREATE INDEX idx_users_email_status ON users (email, status);

CREATE INDEX idx_categories_is_active ON categories (is_active);

CREATE INDEX idx_authors_is_active ON authors (is_active);

CREATE INDEX idx_books_category_id ON books (category_id);
CREATE INDEX idx_books_status ON books (status);
CREATE INDEX idx_books_title ON books (title);

CREATE INDEX idx_book_copies_book_id ON book_copies (book_id);
CREATE INDEX idx_book_copies_status ON book_copies (copy_status);
CREATE INDEX idx_book_copies_book_status ON book_copies (book_id, copy_status);

CREATE INDEX idx_book_authors_author_id ON book_authors (author_id);

CREATE INDEX idx_issued_books_copy_id ON issued_books (copy_id);
CREATE INDEX idx_issued_books_user_id ON issued_books (user_id);
CREATE INDEX idx_issued_books_status_due_date ON issued_books (issue_status, due_date);
CREATE INDEX idx_issued_books_issue_date ON issued_books (issue_date);

CREATE INDEX idx_fines_issue_id ON fines (issue_id);
CREATE INDEX idx_fines_payment_status ON fines (payment_status);
CREATE INDEX idx_fines_assessed_at ON fines (assessed_at);

CREATE INDEX idx_transactions_issue_id ON transactions (issue_id);
CREATE INDEX idx_transactions_fine_id ON transactions (fine_id);
CREATE INDEX idx_transactions_user_id ON transactions (user_id);
CREATE INDEX idx_transactions_type_date ON transactions (transaction_type, transaction_date);
CREATE INDEX idx_transactions_status ON transactions (transaction_status);