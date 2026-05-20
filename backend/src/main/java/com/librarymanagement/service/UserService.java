package com.librarymanagement.service;

import java.util.List;

import com.librarymanagement.dto.request.UserUpdateRequestDTO;
import com.librarymanagement.dto.response.UserResponseDTO;

public interface UserService {

    List<UserResponseDTO> getAllUsers();

    UserResponseDTO getUserById(Long userId);

    UserResponseDTO updateUser(Long userId, UserUpdateRequestDTO requestDTO);

    void deleteUser(Long userId);
}
