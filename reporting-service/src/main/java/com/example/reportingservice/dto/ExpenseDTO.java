package com.example.reportingservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExpenseDTO {
    private Long id;
    private String description;
    private double amount;
    private String category; // Assuming category is a String for simplicity
    private LocalDate date;
}
