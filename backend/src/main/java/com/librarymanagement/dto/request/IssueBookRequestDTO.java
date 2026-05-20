package com.librarymanagement.dto.request;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
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
public class IssueBookRequestDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull(message = "User id is required")
    private Long userId;

    @NotNull(message = "Book id is required")
    private Long bookId;

    @NotNull(message = "Due date is required")
    @Future(message = "Due date must be in the future")
    private LocalDate dueDate;
}
