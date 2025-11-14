package com.example.operationsservice.entity;

import com.example.operationsservice.entity.ExpenseCategory;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private double amount;

    @Enumerated(EnumType.STRING) // Store enum as String in DB
    private ExpenseCategory category; // SALARY, RENT, SUPPLIES, etc.

    private LocalDateTime expenseDate;
}
