package com.example.reportingservice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "daily_sales_reports")
public class DailySalesReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private double totalSales;
    private int totalTransactions;
    private double averageSaleValue;
}
