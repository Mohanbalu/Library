package com.librarymanagement.service;

import com.librarymanagement.dto.request.LoginRequestDTO;
import com.librarymanagement.dto.request.RegisterRequestDTO;
import com.librarymanagement.dto.response.AuthResponseDTO;

public interface AuthService {

    AuthResponseDTO registerUser(RegisterRequestDTO requestDTO);

    AuthResponseDTO loginUser(LoginRequestDTO requestDTO);

    boolean validateUser(LoginRequestDTO requestDTO);
}
