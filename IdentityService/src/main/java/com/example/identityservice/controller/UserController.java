package com.example.identityservice.controller;

import com.example.identityservice.dto.UpdateRoleRequest;
import com.example.identityservice.dto.UserResponse;
import com.example.identityservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * 1Cari login olan istifadəçinin məlumatlarını qaytarır
     *    (token ilə daxil olan istifadəçi üçün)
     */
    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(Authentication authentication) {
        String email = authentication.getName(); // JWT-dən gələn email
        UserResponse resp = userService.getByEmail(email);
        return ResponseEntity.ok(resp);
    }

    /**
     * 2Bütün istifadəçiləri qaytarır — yalnız ADMIN görə bilər
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> all() {
        List<UserResponse> list = userService.getAllUsers();
        return ResponseEntity.ok(list);
    }

    /**
     * 3İstifadəçinin rolunu dəyişir — yalnız ADMIN görə bilər
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/role")
    public ResponseEntity<UserResponse> updateRole(@PathVariable("id") Long id,
                                                   @RequestBody UpdateRoleRequest req) {
        UserResponse updated = userService.updateRole(id, req);
        return ResponseEntity.ok(updated);
    }
}
