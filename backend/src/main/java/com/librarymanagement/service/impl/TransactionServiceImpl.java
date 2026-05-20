package com.librarymanagement.service.impl;

import java.util.List;
import java.util.Map;

import com.librarymanagement.entity.Transaction;
import com.librarymanagement.entity.User;
import com.librarymanagement.enums.TransactionType;
import com.librarymanagement.exception.ResourceNotFoundException;
import com.librarymanagement.mapper.LibraryMapper;
import com.librarymanagement.repository.TransactionRepository;
import com.librarymanagement.repository.UserRepository;
import com.librarymanagement.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public Transaction createTransaction(Long userId, TransactionType transactionType, String remarks) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Transaction transaction = Transaction.builder()
                .user(user)
                .transactionType(transactionType)
                .remarks(remarks)
                .build();

        return transactionRepository.save(transaction);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getAllTransactions() {
        return LibraryMapper.toTransactionMaps(transactionRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getUserTransactions(Long userId) {
        return LibraryMapper.toTransactionMaps(transactionRepository.findByUserId(userId));
    }
}
