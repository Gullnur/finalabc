package com.example.identityservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@AllArgsConstructor
public class TokenValidateResponse {
    private boolean valid;
}
