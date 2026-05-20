-- Sample issue, fine, and transaction history.

INSERT INTO issued_books (
    issue_id,
    copy_id,
    user_id,
    issued_by_user_id,
    returned_by_user_id,
    issue_date,
    due_date,
    return_date,
    renewal_count,
    issue_status,
    remarks,
    created_at,
    updated_at
) VALUES
(1, 1, 2, 1, 1, '2026-05-01 10:00:00', '2026-05-08 10:00:00', '2026-05-12 15:30:00', 0, 'RETURNED', 'Returned with a small overdue fine.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 3, 1, NULL, '2026-05-10 11:00:00', '2026-05-17 11:00:00', NULL, 0, 'ISSUED', 'Currently borrowed by the member.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO fines (
    fine_id,
    issue_id,
    fine_amount,
    fine_rate_per_day,
    overdue_days,
    payment_status,
    assessed_at,
    paid_at,
    waived_at,
    remarks,
    created_at,
    updated_at
) VALUES
(1, 1, 20.00, 5.00, 4, 'PAID', '2026-05-12 15:35:00', '2026-05-12 16:00:00', NULL, 'Paid in full on return.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO transactions (
    transaction_id,
    issue_id,
    fine_id,
    user_id,
    processed_by_user_id,
    transaction_type,
    transaction_status,
    payment_method,
    transaction_date,
    amount,
    reference_no,
    remarks,
    created_at,
    updated_at
) VALUES
(1, 1, NULL, 2, 1, 'ISSUE', 'SUCCESS', 'NOT_APPLICABLE', '2026-05-01 10:00:00', 0.00, 'TXN-ISSUE-0001', 'Book issued to the member.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, NULL, 2, 1, 'RETURN', 'SUCCESS', 'NOT_APPLICABLE', '2026-05-12 15:30:00', 0.00, 'TXN-RETURN-0001', 'Book returned after due date.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 1, 1, 2, 1, 'FINE_PAYMENT', 'SUCCESS', 'CASH', '2026-05-12 16:00:00', 20.00, 'TXN-FINE-0001', 'Fine collected for overdue return.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 2, NULL, 3, 1, 'ISSUE', 'SUCCESS', 'NOT_APPLICABLE', '2026-05-10 11:00:00', 0.00, 'TXN-ISSUE-0002', 'Active issue for member two.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);