package com.librarymanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.librarymanagement.entity.Book;
import com.librarymanagement.enums.BookStatus;

public interface BookRepository extends JpaRepository<Book, Long> {

    Optional<Book> findByIsbn(String isbn);

    boolean existsByIsbn(String isbn);

    List<Book> findByStatus(BookStatus status);

    Page<Book> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
