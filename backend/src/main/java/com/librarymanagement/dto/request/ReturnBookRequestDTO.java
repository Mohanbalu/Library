package com.librarymanagement.dto.request;

import java.io.Serializable;

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
public class ReturnBookRequestDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull(message = "Issued book id is required")
    private Long issuedBookId;
}
