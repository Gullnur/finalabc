package com.example.operationsservice.controller;

import com.example.operationsservice.entity.Expense;
import com.example.operationsservice.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    @GetMapping
    public List<Expense> getAll() {
        return service.getAllExpenses();
    }

    @PostMapping
    public Expense create(@RequestBody Expense expense) {
        return service.createExpense(expense);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteExpense(id);
    }
}
