package com.librarymanagement.service;

import java.util.List;
import java.util.Map;

import com.librarymanagement.entity.Transaction;
import com.librarymanagement.enums.TransactionType;

public interface TransactionService {

    Transaction createTransaction(Long userId, TransactionType transactionType, String remarks);

    List<Map<String, Object>> getAllTransactions();

    List<Map<String, Object>> getUserTransactions(Long userId);
}
