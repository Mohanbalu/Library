package com.librarymanagement.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import com.librarymanagement.dto.response.FineResponseDTO;
import com.librarymanagement.entity.Fine;
import com.librarymanagement.entity.IssuedBook;
import com.librarymanagement.enums.PaymentStatus;
import com.librarymanagement.enums.TransactionType;
import com.librarymanagement.exception.BadRequestException;
import com.librarymanagement.exception.ResourceNotFoundException;
import com.librarymanagement.mapper.LibraryMapper;
import com.librarymanagement.repository.FineRepository;
import com.librarymanagement.repository.IssuedBookRepository;
import com.librarymanagement.service.FineService;
import com.librarymanagement.service.TransactionService;
import com.librarymanagement.utils.AppConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FineServiceImpl implements FineService {

    private final FineRepository fineRepository;
    private final IssuedBookRepository issuedBookRepository;
    private final TransactionService transactionService;

    @Override
    @Transactional(readOnly = true)
    public Double calculateFine(Long issuedBookId) {
        IssuedBook issuedBook = findIssuedBookById(issuedBookId);
        LocalDate dueDate = issuedBook.getDueDate();
        LocalDate effectiveReturnDate = issuedBook.getReturnDate() != null ? issuedBook.getReturnDate() : LocalDate.now();
        long overdueDays = ChronoUnit.DAYS.between(dueDate, effectiveReturnDate);
        if (overdueDays <= 0) {
            return 0.0d;
        }
        return overdueDays * AppConstants.DAILY_FINE_RATE;
    }

    @Override
    @Transactional
    public FineResponseDTO generateFine(Long issuedBookId) {
        IssuedBook issuedBook = findIssuedBookById(issuedBookId);
        double fineAmount = calculateFine(issuedBookId);
        if (fineAmount <= 0.0d) {
            throw new BadRequestException("No fine is applicable for issued book id: " + issuedBookId);
        }

        Fine fine = fineRepository.findByIssuedBookId(issuedBookId).orElseGet(Fine::new);
        fine.setIssuedBook(issuedBook);
        fine.setFineAmount(fineAmount);
        fine.setPaymentStatus(PaymentStatus.PENDING);
        fine.setPaidDate(null);

        return LibraryMapper.toFineResponse(fineRepository.save(fine));
    }

    @Override
    @Transactional
    public FineResponseDTO markFineAsPaid(Long fineId) {
        Fine fine = fineRepository.findById(fineId)
                .orElseThrow(() -> new ResourceNotFoundException("Fine not found with id: " + fineId));

        fine.setPaymentStatus(PaymentStatus.PAID);
        fine.setPaidDate(LocalDateTime.now());

        Fine savedFine = fineRepository.save(fine);
        transactionService.createTransaction(
                savedFine.getIssuedBook().getUser().getId(),
                TransactionType.FINE_PAYMENT,
                "Fine payment for issued book id: " + savedFine.getIssuedBook().getId());

        return LibraryMapper.toFineResponse(savedFine);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FineResponseDTO> getAllFines() {
        return fineRepository.findAll().stream().map(LibraryMapper::toFineResponse).toList();
    }

    private IssuedBook findIssuedBookById(Long issuedBookId) {
        return issuedBookRepository.findById(issuedBookId)
                .orElseThrow(() -> new ResourceNotFoundException("Issued book not found with id: " + issuedBookId));
    }
}
