package com.librarymanagement.controller;

import java.util.List;

import com.librarymanagement.dto.request.IssueBookRequestDTO;
import com.librarymanagement.dto.request.ReturnBookRequestDTO;
import com.librarymanagement.dto.response.ApiResponseDTO;
import com.librarymanagement.service.IssueService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueService issueService;

    @PostMapping("/issue")
    public ResponseEntity<ApiResponseDTO> issueBook(@Valid @RequestBody IssueBookRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.builder().success(true).message("Book issued successfully").data(issueService.issueBook(requestDTO)).build());
    }

    @PostMapping("/return")
    public ResponseEntity<ApiResponseDTO> returnBook(@Valid @RequestBody ReturnBookRequestDTO requestDTO) {
        return ResponseEntity.ok(ApiResponseDTO.builder().success(true).message("Book returned successfully").data(issueService.returnBook(requestDTO)).build());
    }

    @GetMapping
    public ResponseEntity<ApiResponseDTO> getIssuedBooks() {
        List<?> issues = issueService.getIssuedBooks();
        return ResponseEntity.ok(ApiResponseDTO.builder().success(true).message("Issued books fetched successfully").data(issues).build());
    }
}
