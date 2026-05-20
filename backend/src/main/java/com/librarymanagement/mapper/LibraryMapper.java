package com.librarymanagement.mapper;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.librarymanagement.dto.response.BookResponseDTO;
import com.librarymanagement.dto.response.FineResponseDTO;
import com.librarymanagement.dto.response.IssueBookResponseDTO;
import com.librarymanagement.dto.response.UserResponseDTO;
import com.librarymanagement.entity.Book;
import com.librarymanagement.entity.Fine;
import com.librarymanagement.entity.IssuedBook;
import com.librarymanagement.entity.Transaction;
import com.librarymanagement.entity.User;

public final class LibraryMapper {

    private LibraryMapper() {
    }

    public static UserResponseDTO toUserResponse(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole() != null ? user.getRole().getRoleName() : null)
                .build();
    }

    public static BookResponseDTO toBookResponse(Book book) {
        return BookResponseDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .authorName(book.getAuthor() != null ? book.getAuthor().getAuthorName() : null)
                .categoryName(book.getCategory() != null ? book.getCategory().getCategoryName() : null)
                .availability(book.getAvailableQuantity() != null && book.getAvailableQuantity() > 0)
                .quantity(book.getQuantity())
                .build();
    }

    public static IssueBookResponseDTO toIssueResponse(IssuedBook issuedBook) {
        return IssueBookResponseDTO.builder()
                .id(issuedBook.getId())
                .issueDate(issuedBook.getIssueDate())
                .dueDate(issuedBook.getDueDate())
                .returnDate(issuedBook.getReturnDate())
                .issueStatus(issuedBook.getIssueStatus())
                .userId(issuedBook.getUser() != null ? issuedBook.getUser().getId() : null)
                .bookId(issuedBook.getBook() != null ? issuedBook.getBook().getId() : null)
                .build();
    }

    public static FineResponseDTO toFineResponse(Fine fine) {
        return FineResponseDTO.builder()
                .id(fine.getId())
                .fineAmount(fine.getFineAmount())
                .paymentStatus(fine.getPaymentStatus())
                .paidDate(fine.getPaidDate())
                .issuedBookId(fine.getIssuedBook() != null ? fine.getIssuedBook().getId() : null)
                .build();
    }

    public static Map<String, Object> toTransactionMap(Transaction transaction) {
        Map<String, Object> transactionMap = new LinkedHashMap<>();
        transactionMap.put("id", transaction.getId());
        transactionMap.put("transactionType", transaction.getTransactionType());
        transactionMap.put("transactionDate", transaction.getTransactionDate());
        transactionMap.put("remarks", transaction.getRemarks());
        transactionMap.put("userId", transaction.getUser() != null ? transaction.getUser().getId() : null);
        transactionMap.put("userName", transaction.getUser() != null ? transaction.getUser().getFullName() : null);
        transactionMap.put("userEmail", transaction.getUser() != null ? transaction.getUser().getEmail() : null);
        return transactionMap;
    }

    public static List<Map<String, Object>> toTransactionMaps(List<Transaction> transactions) {
        return transactions.stream().map(LibraryMapper::toTransactionMap).collect(Collectors.toList());
    }
}
