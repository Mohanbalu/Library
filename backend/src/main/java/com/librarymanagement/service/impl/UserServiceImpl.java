package com.librarymanagement.service.impl;

import java.util.List;

import com.librarymanagement.dto.request.UserUpdateRequestDTO;
import com.librarymanagement.dto.response.UserResponseDTO;
import com.librarymanagement.entity.User;
import com.librarymanagement.enums.UserStatus;
import com.librarymanagement.exception.ResourceNotFoundException;
import com.librarymanagement.repository.UserRepository;
import com.librarymanagement.mapper.LibraryMapper;
import com.librarymanagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream().map(LibraryMapper::toUserResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO getUserById(Long userId) {
        return LibraryMapper.toUserResponse(findUserById(userId));
    }

    @Override
    @Transactional
    public UserResponseDTO updateUser(Long userId, UserUpdateRequestDTO requestDTO) {
        User user = findUserById(userId);
        user.setFullName(requestDTO.getFullName());
        user.setPhoneNumber(requestDTO.getPhoneNumber());
        return LibraryMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) {
        User user = findUserById(userId);
        user.setAccountStatus(UserStatus.DELETED);
        userRepository.save(user);
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }
}
