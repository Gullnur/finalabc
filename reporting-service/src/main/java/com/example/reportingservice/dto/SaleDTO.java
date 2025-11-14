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
public class SaleDTO {
    private Long id;
    private String productName;
    private int quantity;
    private double price;
    private String status; // Assuming status is a String for simplicity
    private LocalDate date;
}
