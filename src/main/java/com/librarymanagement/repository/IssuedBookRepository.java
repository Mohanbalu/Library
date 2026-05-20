package com.librarymanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.librarymanagement.entity.IssuedBook;
import com.librarymanagement.enums.IssueStatus;

public interface IssuedBookRepository extends JpaRepository<IssuedBook, Long> {

    List<IssuedBook> findByUserId(Long userId);

    List<IssuedBook> findByBookId(Long bookId);

    List<IssuedBook> findByIssueStatus(IssueStatus issueStatus);
}
