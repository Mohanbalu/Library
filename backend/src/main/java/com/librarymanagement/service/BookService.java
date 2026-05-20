package com.librarymanagement.service;

import java.util.List;

import com.librarymanagement.dto.request.BookRequestDTO;
import com.librarymanagement.dto.response.BookResponseDTO;

public interface BookService {

    BookResponseDTO addBook(BookRequestDTO requestDTO);

    BookResponseDTO updateBook(Long bookId, BookRequestDTO requestDTO);

    void deleteBook(Long bookId);

    List<BookResponseDTO> getAllBooks();

    BookResponseDTO getBookById(Long bookId);

    List<BookResponseDTO> searchBooks(String keyword);
}
