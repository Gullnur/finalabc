package com.example.identityservice.security.jwt;

import com.example.identityservice.security.service.CustomUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();
        System.out.println("\n================ JWT FILTER DEBUG ================");
        System.out.println("Request Path: " + path);

        // Auth endpointləri üçün yoxlama aparma
        if (path.startsWith("/api/v1/auth")) {
            System.out.println("Auth endpoint — JWT yoxlanmır.");
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header == null || !header.startsWith("Bearer ")) {
            System.out.println("Authorization header tapılmadı və ya səhvdir");
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);
        String email = null;

        try {
            email = jwtUtil.extractEmail(token);
            System.out.println("Token email: " + email);
        } catch (ExpiredJwtException e) {
            System.out.println("Token expired");
        } catch (Exception e) {
            System.out.println("Token etibarsız: " + e.getMessage());
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            System.out.println("DB-dən tapılan user: " + userDetails.getUsername());
            System.out.println("Rollar: " + userDetails.getAuthorities());

            if (jwtUtil.validateToken(token)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
                System.out.println("Authentication konteksə yerləşdirildi");
            } else {
                System.out.println("Token validation uğursuz oldu");
            }
        } else {
            System.out.println("Email null və ya artıq authenticated idi");
        }

        System.out.println("==================================================\n");
        filterChain.doFilter(request, response);
    }
}
