package com.librarymanagement.controller;

import java.util.List;

import com.librarymanagement.dto.response.ApiResponseDTO;
import com.librarymanagement.service.FineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/fines")
public class FineController {

    private final FineService fineService;

    @GetMapping
    public ResponseEntity<ApiResponseDTO> getAllFines() {
        List<?> fines = fineService.getAllFines();
        return ResponseEntity.ok(ApiResponseDTO.builder().success(true).message("Fines fetched successfully").data(fines).build());
    }

    @PostMapping("/pay/{fineId}")
    public ResponseEntity<ApiResponseDTO> payFine(@PathVariable Long fineId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponseDTO.builder().success(true).message("Fine paid successfully").data(fineService.markFineAsPaid(fineId)).build());
    }
}
