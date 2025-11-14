package com.example.operationsservice.service;

import com.example.operationsservice.entity.Expense;
import com.example.operationsservice.entity.ExpenseCategory; // Added import
import com.example.operationsservice.exception.ResourceNotFoundException; // Added import
import com.example.operationsservice.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ExpenseService {
    private final ExpenseRepository repository;

    public ExpenseService(ExpenseRepository repository) {
        this.repository = repository;
    }

    public List<Expense> getAllExpenses() {
        return repository.findAll();
    }

    public Expense createExpense(Expense expense) {
        // Ensure category is valid if it's an enum
        if (expense.getCategory() == null) {
            // Default or throw error if category is mandatory
            expense.setCategory(ExpenseCategory.OTHER);
        }
        expense.setExpenseDate(LocalDateTime.now());
        return repository.save(expense);
    }

    public void deleteExpense(Long id) {
        // Check if the expense exists before deleting
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Expense not found with id " + id);
        }
        repository.deleteById(id);
    }
}
