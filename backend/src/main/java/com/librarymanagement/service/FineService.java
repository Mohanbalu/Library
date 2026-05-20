package com.librarymanagement.service;

import java.util.List;

import com.librarymanagement.dto.response.FineResponseDTO;

public interface FineService {

    Double calculateFine(Long issuedBookId);

    FineResponseDTO generateFine(Long issuedBookId);

    FineResponseDTO markFineAsPaid(Long fineId);

    List<FineResponseDTO> getAllFines();
}
