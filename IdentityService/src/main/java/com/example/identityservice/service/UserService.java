package com.example.identityservice.service;

import com.example.identityservice.dto.UpdateRoleRequest;
import com.example.identityservice.dto.UserResponse;
import com.example.identityservice.entity.User;
import com.example.identityservice.exception.ResourceNotFoundException; // Added import
import com.example.identityservice.repository.UserRepository;
import com.example.identityservice.security.model.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse toDto(User u) {
        return new UserResponse(u.getId(), u.getEmail(), u.getRole(), u.isActive());
    }

    public UserResponse getByEmail(String email) {
        User u = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found")); // Changed exception
        return toDto(u);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserResponse updateRole(Long userId, UpdateRoleRequest req) {
        User u = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found")); // Changed exception
        Role newRole = req.getRole();
        u.setRole(newRole);
        userRepository.save(u);
        return toDto(u);
    }
}
