package com.example.identityservice.dto;

import com.example.identityservice.security.model.Role;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UserResponse {
    private Long id;
    private String email;
    private Role role;
    private boolean isActive;
}
