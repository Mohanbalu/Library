package com.librarymanagement.controller;

import java.util.List;

import com.librarymanagement.dto.request.BookRequestDTO;
import com.librarymanagement.dto.response.ApiResponseDTO;
import com.librarymanagement.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    @PostMapping
    public ResponseEntity<ApiResponseDTO> addBook(@Valid @RequestBody BookRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.builder().success(true).message("Book created successfully").data(bookService.addBook(requestDTO)).build());
    }

    @GetMapping
    public ResponseEntity<ApiResponseDTO> getAllBooks() {
        List<?> books = bookService.getAllBooks();
        return ResponseEntity.ok(ApiResponseDTO.builder().success(true).message("Books fetched successfully").data(books).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDTO> getBookById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponseDTO.builder().success(true).message("Book fetched successfully").data(bookService.getBookById(id)).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDTO> updateBook(@PathVariable Long id, @Valid @RequestBody BookRequestDTO requestDTO) {
        return ResponseEntity.ok(ApiResponseDTO.builder().success(true).message("Book updated successfully").data(bookService.updateBook(id, requestDTO)).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDTO> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok(ApiResponseDTO.builder().success(true).message("Book deleted successfully").build());
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponseDTO> searchBooks(@RequestParam(required = false) String keyword) {
        List<?> books = bookService.searchBooks(keyword);
        return ResponseEntity.ok(ApiResponseDTO.builder().success(true).message("Books search completed successfully").data(books).build());
    }
}
