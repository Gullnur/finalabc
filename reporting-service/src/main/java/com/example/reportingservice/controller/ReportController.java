package com.example.reportingservice.controller;

import com.example.reportingservice.entity.DailySalesReport;
import com.example.reportingservice.entity.ExpenseSummary;
import com.example.reportingservice.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor // Using Lombok's RequiredArgsConstructor for constructor injection
public class ReportController {

    private final ReportService service;

    // Removed the old constructor as @RequiredArgsConstructor handles it

    @GetMapping("/sales")
    public List<DailySalesReport> getSalesReports() {
        return service.getAllSalesReports();
    }

    @GetMapping("/expenses")
    public List<ExpenseSummary> getExpenseReports() {
        return service.getAllExpenseReports();
    }

    // Removed @PostMapping("/sales") and @PostMapping("/expenses") as reporting service should not directly add data
    // @PostMapping("/sales")
    // public DailySalesReport addSales(@RequestBody DailySalesReport report) {
    //     return service.addDailySales(report);
    // }

    // @PostMapping("/expenses")
    // public ExpenseSummary addExpense(@RequestBody ExpenseSummary expense) {
    //     return service.addExpenseSummary(expense);
    // }
}