package com.librarymanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.librarymanagement.entity.Fine;
import com.librarymanagement.enums.PaymentStatus;

public interface FineRepository extends JpaRepository<Fine, Long> {

    Optional<Fine> findByIssuedBookId(Long issuedBookId);

    List<Fine> findByPaymentStatus(PaymentStatus paymentStatus);
}
