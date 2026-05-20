package com.librarymanagement.dto.response;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.librarymanagement.enums.PaymentStatus;

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
public class FineResponseDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private Double fineAmount;

    private PaymentStatus paymentStatus;

    private LocalDateTime paidDate;

    private Long issuedBookId;
}
