package com.librarymanagement.controller;

import java.util.List;

import com.librarymanagement.dto.request.UserUpdateRequestDTO;
import com.librarymanagement.dto.response.ApiResponseDTO;
import com.librarymanagement.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponseDTO> getAllUsers() {
        List<?> users = userService.getAllUsers();
        return ResponseEntity.ok(ApiResponseDTO.builder().success(true).message("Users fetched successfully").data(users).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponseDTO.builder().success(true).message("User fetched successfully").data(userService.getUserById(id)).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDTO> updateUser(@PathVariable Long id, @Valid @RequestBody UserUpdateRequestDTO requestDTO) {
        return ResponseEntity.ok(ApiResponseDTO.builder().success(true).message("User updated successfully").data(userService.updateUser(id, requestDTO)).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDTO> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(ApiResponseDTO.builder().success(true).message("User deleted successfully").build());
    }
}
