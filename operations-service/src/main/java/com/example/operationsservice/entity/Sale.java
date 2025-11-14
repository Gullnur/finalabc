package com.example.operationsservice.entity;

import com.example.operationsservice.entity.SaleStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "sales")
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;

    private int quantity;

    private double price;

    private String customerName;

    private LocalDateTime saleDate;

    @Enumerated(EnumType.STRING) // Store enum as String in DB
    private SaleStatus status; // COMPLETED, PENDING, CANCELED
}
