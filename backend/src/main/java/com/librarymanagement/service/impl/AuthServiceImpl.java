package com.librarymanagement.service.impl;

import com.librarymanagement.dto.request.LoginRequestDTO;
import com.librarymanagement.dto.request.RegisterRequestDTO;
import com.librarymanagement.dto.response.AuthResponseDTO;
import com.librarymanagement.entity.Role;
import com.librarymanagement.entity.User;
import com.librarymanagement.enums.UserStatus;
import com.librarymanagement.exception.BadRequestException;
import com.librarymanagement.exception.DuplicateResourceException;
import com.librarymanagement.repository.RoleRepository;
import com.librarymanagement.repository.UserRepository;
import com.librarymanagement.security.jwt.JwtUtil;
import com.librarymanagement.service.AuthService;
import com.librarymanagement.utils.AppConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Override
    @Transactional
    public AuthResponseDTO registerUser(RegisterRequestDTO requestDTO) {
        if (userRepository.existsByEmail(requestDTO.getEmail())) {
            throw new DuplicateResourceException("User already exists with email: " + requestDTO.getEmail());
        }

        Role userRole = roleRepository.findByRoleName(AppConstants.ROLE_USER)
                .orElseThrow(() -> new BadRequestException("Default USER role is not configured"));

        User user = User.builder()
                .fullName(requestDTO.getFullName())
                .email(requestDTO.getEmail().toLowerCase())
                .password(passwordEncoder.encode(requestDTO.getPassword()))
                .phoneNumber(requestDTO.getPhoneNumber())
                .role(userRole)
                .accountStatus(UserStatus.ACTIVE)
                .build();

        User savedUser = userRepository.save(user);
        String token = jwtUtil.generateToken(savedUser.getEmail());

        return AuthResponseDTO.builder()
                .token(token)
                .role(savedUser.getRole().getRoleName())
                .message("User registered successfully")
                .build();
    }

    @Override
    public AuthResponseDTO loginUser(LoginRequestDTO requestDTO) {
        validateUser(requestDTO);

        User user = userRepository.findByEmail(requestDTO.getEmail().toLowerCase())
                .orElseThrow(() -> new BadRequestException("Invalid login credentials"));

        String token = jwtUtil.generateToken(user.getEmail());

        return AuthResponseDTO.builder()
                .token(token)
                .role(user.getRole() != null ? user.getRole().getRoleName() : null)
                .message("Login successful")
                .build();
    }

    @Override
    public boolean validateUser(LoginRequestDTO requestDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        requestDTO.getEmail().toLowerCase(),
                        requestDTO.getPassword()));
        return true;
    }
}
