package com.librarymanagement.service.impl;

import java.time.LocalDate;
import java.util.List;

import com.librarymanagement.dto.request.IssueBookRequestDTO;
import com.librarymanagement.dto.request.ReturnBookRequestDTO;
import com.librarymanagement.dto.response.IssueBookResponseDTO;
import com.librarymanagement.entity.Book;
import com.librarymanagement.entity.IssuedBook;
import com.librarymanagement.entity.User;
import com.librarymanagement.enums.BookStatus;
import com.librarymanagement.enums.IssueStatus;
import com.librarymanagement.enums.TransactionType;
import com.librarymanagement.exception.BadRequestException;
import com.librarymanagement.exception.ResourceNotFoundException;
import com.librarymanagement.mapper.LibraryMapper;
import com.librarymanagement.repository.BookRepository;
import com.librarymanagement.repository.IssuedBookRepository;
import com.librarymanagement.repository.UserRepository;
import com.librarymanagement.service.FineService;
import com.librarymanagement.service.IssueService;
import com.librarymanagement.service.TransactionService;
import com.librarymanagement.utils.AppConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class IssueServiceImpl implements IssueService {

    private final IssuedBookRepository issuedBookRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final TransactionService transactionService;
    private final FineService fineService;

    @Override
    @Transactional
    public IssueBookResponseDTO issueBook(IssueBookRequestDTO requestDTO) {
        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + requestDTO.getUserId()));
        Book book = bookRepository.findById(requestDTO.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + requestDTO.getBookId()));

        if (book.getAvailableQuantity() == null || book.getAvailableQuantity() <= 0) {
            throw new BadRequestException("Book is not available for issue");
        }

        if (requestDTO.getDueDate() == null) {
            throw new BadRequestException("Due date is required");
        }

        IssuedBook issuedBook = IssuedBook.builder()
                .issueDate(LocalDate.now())
                .dueDate(requestDTO.getDueDate())
                .issueStatus(IssueStatus.ISSUED)
                .user(user)
                .book(book)
                .build();

        IssuedBook savedIssue = issuedBookRepository.save(issuedBook);

        book.setAvailableQuantity(book.getAvailableQuantity() - 1);
        book.setStatus(book.getAvailableQuantity() > 0 ? BookStatus.AVAILABLE : BookStatus.UNAVAILABLE);
        bookRepository.save(book);

        transactionService.createTransaction(user.getId(), TransactionType.ISSUE,
                "Book issued: " + book.getTitle() + " (bookId=" + book.getId() + ")");

        return LibraryMapper.toIssueResponse(savedIssue);
    }

    @Override
    @Transactional
    public IssueBookResponseDTO returnBook(ReturnBookRequestDTO requestDTO) {
        IssuedBook issuedBook = issuedBookRepository.findById(requestDTO.getIssuedBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Issued book not found with id: " + requestDTO.getIssuedBookId()));

        if (issuedBook.getIssueStatus() == IssueStatus.RETURNED) {
            throw new BadRequestException("Issued book has already been returned");
        }

        issuedBook.setReturnDate(LocalDate.now());
        issuedBook.setIssueStatus(IssueStatus.RETURNED);
        IssuedBook savedIssue = issuedBookRepository.save(issuedBook);

        Book book = savedIssue.getBook();
        book.setAvailableQuantity(Math.min(book.getQuantity(), book.getAvailableQuantity() + 1));
        book.setStatus(book.getAvailableQuantity() > 0 ? BookStatus.AVAILABLE : BookStatus.UNAVAILABLE);
        bookRepository.save(book);

        double fineAmount = fineService.calculateFine(savedIssue.getId());
        if (fineAmount > 0.0d) {
            fineService.generateFine(savedIssue.getId());
        }

        transactionService.createTransaction(savedIssue.getUser().getId(), TransactionType.RETURN,
                "Book returned: " + book.getTitle() + " (bookId=" + book.getId() + ")");

        return LibraryMapper.toIssueResponse(savedIssue);
    }

    @Override
    @Transactional
    public List<IssueBookResponseDTO> getIssuedBooks() {
        refreshOverdueIssues();
        return issuedBookRepository.findAll().stream().map(LibraryMapper::toIssueResponse).toList();
    }

    private void refreshOverdueIssues() {
        List<IssuedBook> issuedBooks = issuedBookRepository.findByIssueStatus(IssueStatus.ISSUED);
        LocalDate today = LocalDate.now();
        for (IssuedBook issuedBook : issuedBooks) {
            if (issuedBook.getDueDate() != null && issuedBook.getDueDate().isBefore(today)) {
                issuedBook.setIssueStatus(IssueStatus.OVERDUE);
                issuedBookRepository.save(issuedBook);
            }
        }
    }
}
