package com.example.identityservice.dto;

import com.example.identityservice.security.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateRoleRequest {
    private Role role;
    // ROLE_USER .. ROLE_ADMIN
}
