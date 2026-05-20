package com.librarymanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.librarymanagement.entity.Book;
import com.librarymanagement.enums.BookStatus;

public interface BookRepository extends JpaRepository<Book, Long> {

    Optional<Book> findByIsbn(String isbn);

    List<Book> findByStatus(BookStatus status);
}
