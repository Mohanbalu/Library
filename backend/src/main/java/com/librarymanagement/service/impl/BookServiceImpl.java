package com.librarymanagement.service.impl;

import java.util.List;

import com.librarymanagement.dto.request.BookRequestDTO;
import com.librarymanagement.dto.response.BookResponseDTO;
import com.librarymanagement.entity.Author;
import com.librarymanagement.entity.Book;
import com.librarymanagement.entity.Category;
import com.librarymanagement.enums.BookStatus;
import com.librarymanagement.exception.BadRequestException;
import com.librarymanagement.exception.DuplicateResourceException;
import com.librarymanagement.exception.ResourceNotFoundException;
import com.librarymanagement.mapper.LibraryMapper;
import com.librarymanagement.repository.AuthorRepository;
import com.librarymanagement.repository.BookRepository;
import com.librarymanagement.repository.CategoryRepository;
import com.librarymanagement.repository.IssuedBookRepository;
import com.librarymanagement.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;
    private final AuthorRepository authorRepository;
    private final IssuedBookRepository issuedBookRepository;

    @Override
    @Transactional
    public BookResponseDTO addBook(BookRequestDTO requestDTO) {
        validateUniqueIsbn(requestDTO.getIsbn(), null);

        Category category = findActiveCategory(requestDTO.getCategoryId());
        Author author = findActiveAuthor(requestDTO.getAuthorId());

        Book book = Book.builder()
                .title(requestDTO.getTitle())
                .isbn(requestDTO.getIsbn())
                .quantity(requestDTO.getQuantity())
                .availableQuantity(requestDTO.getQuantity())
                .description(requestDTO.getDescription())
                .shelfLocation(requestDTO.getShelfLocation())
                .status(requestDTO.getQuantity() > 0 ? BookStatus.AVAILABLE : BookStatus.UNAVAILABLE)
                .category(category)
                .author(author)
                .build();

        return LibraryMapper.toBookResponse(bookRepository.save(book));
    }

    @Override
    @Transactional
    public BookResponseDTO updateBook(Long bookId, BookRequestDTO requestDTO) {
        Book book = findBookById(bookId);
        validateUniqueIsbn(requestDTO.getIsbn(), bookId);

        Category category = findActiveCategory(requestDTO.getCategoryId());
        Author author = findActiveAuthor(requestDTO.getAuthorId());

        int issuedCount = book.getQuantity() - book.getAvailableQuantity();
        if (requestDTO.getQuantity() < issuedCount) {
            throw new BadRequestException("Quantity cannot be less than currently issued copies: " + issuedCount);
        }

        book.setTitle(requestDTO.getTitle());
        book.setIsbn(requestDTO.getIsbn());
        book.setQuantity(requestDTO.getQuantity());
        book.setAvailableQuantity(requestDTO.getQuantity() - issuedCount);
        book.setDescription(requestDTO.getDescription());
        book.setShelfLocation(requestDTO.getShelfLocation());
        book.setStatus(book.getAvailableQuantity() > 0 ? BookStatus.AVAILABLE : BookStatus.UNAVAILABLE);
        book.setCategory(category);
        book.setAuthor(author);

        return LibraryMapper.toBookResponse(bookRepository.save(book));
    }

    @Override
    @Transactional
    public void deleteBook(Long bookId) {
        Book book = findBookById(bookId);
        if (!issuedBookRepository.findByBookId(bookId).isEmpty()) {
            throw new BadRequestException("Cannot delete a book that has issue history");
        }
        bookRepository.delete(book);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookResponseDTO> getAllBooks() {
        return bookRepository.findAll().stream().map(LibraryMapper::toBookResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public BookResponseDTO getBookById(Long bookId) {
        return LibraryMapper.toBookResponse(findBookById(bookId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookResponseDTO> searchBooks(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return getAllBooks();
        }

        return bookRepository.findByTitleContainingIgnoreCase(keyword.trim(), Pageable.unpaged())
                .stream()
                .map(LibraryMapper::toBookResponse)
                .toList();
    }

    private Book findBookById(Long bookId) {
        return bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + bookId));
    }

    private Category findActiveCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
        if (Boolean.FALSE.equals(category.getActive())) {
            throw new BadRequestException("Category is inactive: " + categoryId);
        }
        return category;
    }

    private Author findActiveAuthor(Long authorId) {
        Author author = authorRepository.findById(authorId)
                .orElseThrow(() -> new ResourceNotFoundException("Author not found with id: " + authorId));
        if (Boolean.FALSE.equals(author.getActive())) {
            throw new BadRequestException("Author is inactive: " + authorId);
        }
        return author;
    }

    private void validateUniqueIsbn(String isbn, Long bookId) {
        bookRepository.findByIsbn(isbn).ifPresent(existingBook -> {
            if (bookId == null || !existingBook.getId().equals(bookId)) {
                throw new DuplicateResourceException("Book already exists with ISBN: " + isbn);
            }
        });
    }
}
