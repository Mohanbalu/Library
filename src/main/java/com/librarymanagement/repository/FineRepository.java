package com.librarymanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.librarymanagement.entity.Fine;

public interface FineRepository extends JpaRepository<Fine, Long> {

    Optional<Fine> findByIssuedBookId(Long issuedBookId);
}
