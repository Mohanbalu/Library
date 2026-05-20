package com.librarymanagement.dto.response;

import java.io.Serializable;

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
public class UserResponseDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String fullName;

    private String email;

    private String role;
}
