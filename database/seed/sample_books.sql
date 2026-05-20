-- Sample catalog data for categories, authors, books, mappings, and copies.

INSERT INTO categories (category_id, category_code, category_name, description, is_active, deleted_at, created_at, updated_at) VALUES
(1, 'FICTION', 'Fiction', 'Fiction and narrative literature.', 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'TECH', 'Technology', 'Programming, software engineering, and IT books.', 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'BUSINESS', 'Business', 'Management, finance, and entrepreneurship books.', 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO authors (author_id, first_name, last_name, pen_name, biography, email, website_url, nationality, is_active, deleted_at, created_at, updated_at) VALUES
(1, 'Robert', 'Martin', 'Uncle Bob', 'Software engineer and clean code advocate.', 'unclebob@example.com', 'https://cleancoder.com', 'American', 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'J. K.', 'Rowling', NULL, 'Author of the Harry Potter series.', 'jkrowling@example.com', 'https://www.jkrowling.com', 'British', 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Stephen', 'Covey', NULL, 'Author focused on personal and organizational effectiveness.', 'stephencovey@example.com', NULL, 'American', 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO books (
    book_id,
    category_id,
    isbn,
    call_number,
    title,
    subtitle,
    description,
    publisher,
    publication_year,
    edition,
    language,
    status,
    cover_image_url,
    deleted_at,
    created_at,
    updated_at
) VALUES
(1, 2, '9780132350884', 'TECH-001', 'Clean Code', 'A Handbook of Agile Software Craftsmanship', 'Practical guide to writing clean, maintainable code.', 'Prentice Hall', 2008, '1st', 'English', 'ACTIVE', NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, '9780747532743', 'FIC-001', 'Harry Potter and the Philosopher''s Stone', NULL, 'Fantasy novel introducing the wizarding world.', 'Bloomsbury', 1997, '1st', 'English', 'ACTIVE', NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, '9780743269513', 'BUS-001', 'The 7 Habits of Highly Effective People', NULL, 'Classic self-improvement and leadership book.', 'Free Press', 1989, '1st', 'English', 'ACTIVE', NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO book_authors (book_id, author_id, contribution_role, is_primary_author, created_at, updated_at) VALUES
(1, 1, 'AUTHOR', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'AUTHOR', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, 'AUTHOR', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO book_copies (
    copy_id,
    book_id,
    accession_number,
    barcode,
    shelf_location,
    copy_status,
    acquired_on,
    notes,
    deleted_at,
    created_at,
    updated_at
) VALUES
(1, 1, 'ACC-0001', 'BAR-0001', 'A-1-01', 'AVAILABLE', '2025-01-15', 'First circulation copy.', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'ACC-0002', 'BAR-0002', 'A-1-02', 'AVAILABLE', '2025-01-15', 'Second circulation copy.', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 2, 'ACC-0003', 'BAR-0003', 'B-2-01', 'AVAILABLE', '2025-02-10', NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, 'ACC-0004', 'BAR-0004', 'C-3-01', 'AVAILABLE', '2025-03-05', NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);