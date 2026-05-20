package com.librarymanagement.dto.response;

import java.io.Serializable;
import java.time.LocalDate;

import com.librarymanagement.enums.IssueStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IssueBookResponseDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private LocalDate issueDate;

    private LocalDate dueDate;

    private LocalDate returnDate;

    private IssueStatus issueStatus;

    private Long userId;

    private Long bookId;
}
