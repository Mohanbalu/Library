package com.librarymanagement.controller;

import com.librarymanagement.dto.request.LoginRequestDTO;
import com.librarymanagement.dto.request.RegisterRequestDTO;
import com.librarymanagement.dto.response.ApiResponseDTO;
import com.librarymanagement.dto.response.UserResponseDTO;
import com.librarymanagement.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponseDTO> registerUser(@Valid @RequestBody RegisterRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponseDTO.builder()
                        .success(true)
                        .message("User registered successfully")
                        .data(authService.registerUser(requestDTO))
                        .build());
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDTO> loginUser(@Valid @RequestBody LoginRequestDTO requestDTO) {
        return ResponseEntity.ok(
                ApiResponseDTO.builder()
                        .success(true)
                        .message("Login successful")
                        .data(authService.loginUser(requestDTO))
                        .build());
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponseDTO> getCurrentUser() {
        UserResponseDTO currentUser = authService.getCurrentUser();
        return ResponseEntity.ok(
                ApiResponseDTO.builder()
                        .success(true)
                        .message("Current user fetched successfully")
                        .data(currentUser)
                        .build());
    }
}
