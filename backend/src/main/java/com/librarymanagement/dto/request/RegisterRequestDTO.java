package com.librarymanagement.dto.request;

import java.io.Serializable;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
public class RegisterRequestDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@NotBlank(message = "Full name is required")
	@Size(max = 100)
	private String fullName;

	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	@Size(max = 150)
	private String email;

	@NotBlank(message = "Password is required")
	@Size(min = 8, max = 255)
	private String password;

	@NotBlank(message = "Phone number is required")
	@Size(max = 20)
	private String phoneNumber;
}
