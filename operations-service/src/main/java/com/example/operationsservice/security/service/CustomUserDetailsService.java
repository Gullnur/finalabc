package com.example.operationsservice.security.service;

import com.example.operationsservice.security.model.CustomUserDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
// Removed @Service annotation
// import org.springframework.stereotype.Service;

import java.util.Collections;

// Removed @Service annotation
public class CustomUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // In a real microservice, you might call the IdentityService to get user details.
        // For token validation in a resource server, we don't need to load from a local DB.
        // This is a dummy implementation to satisfy Spring Security's UserDetailsService contract.
        // The actual user details (roles, etc.) will be extracted from the JWT in JwtAuthenticationFilter.
        return new CustomUserDetails(username, "", Collections.emptyList(), true);
    }
}
