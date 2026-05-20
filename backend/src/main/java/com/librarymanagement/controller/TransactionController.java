package com.librarymanagement.controller;

import java.util.List;
import java.util.Map;

import com.librarymanagement.dto.response.ApiResponseDTO;
import com.librarymanagement.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping
    public ResponseEntity<ApiResponseDTO> getAllTransactions() {
        List<Map<String, Object>> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(ApiResponseDTO.builder().success(true).message("Transactions fetched successfully").data(transactions).build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponseDTO> getUserTransactions(@PathVariable Long userId) {
        List<Map<String, Object>> transactions = transactionService.getUserTransactions(userId);
        return ResponseEntity.ok(ApiResponseDTO.builder().success(true).message("User transactions fetched successfully").data(transactions).build());
    }
}
