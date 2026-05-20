package com.librarymanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.librarymanagement.entity.Transaction;
import com.librarymanagement.enums.TransactionType;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUserId(Long userId);

    List<Transaction> findByTransactionType(TransactionType transactionType);
}
