package com.example.reportingservice.service;

import com.example.reportingservice.client.OperationServiceClient;
import com.example.reportingservice.dto.ExpenseDTO;
import com.example.reportingservice.dto.SaleDTO;
import com.example.reportingservice.entity.DailySalesReport;
import com.example.reportingservice.entity.ExpenseSummary;
import com.example.reportingservice.repository.DailySalesReportRepository;
import com.example.reportingservice.repository.ExpenseSummaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // Using Lombok's RequiredArgsConstructor for constructor injection
public class ReportService {

    private final DailySalesReportRepository salesRepo;
    private final ExpenseSummaryRepository expenseRepo;
    private final OperationServiceClient operationServiceClient;


    public List<DailySalesReport> getAllSalesReports() {
        // Fetch sales data from operations-service
        List<SaleDTO> sales = operationServiceClient.getAllSales();

        // Aggregate sales data by date
        Map<LocalDate, Double> salesByDate = sales.stream()
                .collect(Collectors.groupingBy(SaleDTO::getDate,
                        Collectors.summingDouble(sale -> sale.getQuantity() * sale.getPrice())));

        Map<LocalDate, Long> transactionsByDate = sales.stream()
                .collect(Collectors.groupingBy(SaleDTO::getDate, Collectors.counting()));

        // Convert aggregated data to DailySalesReport entities
        List<DailySalesReport> dailySalesReports = salesByDate.entrySet().stream()
                .map(entry -> {
                    LocalDate date = entry.getKey();
                    double totalSales = entry.getValue();
                    long totalTransactions = transactionsByDate.getOrDefault(date, 0L);
                    double averageSaleValue = totalTransactions > 0 ? totalSales / totalTransactions : 0.0;

                    return DailySalesReport.builder()
                            .date(date)
                            .totalSales(totalSales)
                            .totalTransactions((int) totalTransactions)
                            .averageSaleValue(averageSaleValue)
                            .build();
                })
                .collect(Collectors.toList());

        // Save and return the aggregated reports
        return salesRepo.saveAll(dailySalesReports);
    }

    public List<ExpenseSummary> getAllExpenseReports() {
        List<ExpenseDTO> expenses = operationServiceClient.getAllExpenses();

        Map<LocalDate, Double> expensesByDate = expenses.stream()
                .collect(Collectors.groupingBy(ExpenseDTO::getDate,
                        Collectors.summingDouble(ExpenseDTO::getAmount)));

        Map<LocalDate, String> topCategoryByDate = expenses.stream()
                .collect(Collectors.groupingBy(ExpenseDTO::getDate,
                        Collectors.collectingAndThen(
                                Collectors.groupingBy(ExpenseDTO::getCategory, Collectors.summingDouble(ExpenseDTO::getAmount)),
                                categoryMap -> categoryMap.entrySet().stream()
                                        .max(Map.Entry.comparingByValue())
                                        .map(Map.Entry::getKey)
                                        .orElse("N/A")
                        )));

        List<ExpenseSummary> expenseSummaries = expensesByDate.entrySet().stream()
                .map(entry -> {
                    LocalDate date = entry.getKey();
                    double totalExpenses = entry.getValue();
                    String topCategory = topCategoryByDate.getOrDefault(date, "N/A");

                    return ExpenseSummary.builder()
                            .date(date)
                            .totalExpenses(totalExpenses)
                            .topCategory(topCategory)
                            .build();
                })
                .collect(Collectors.toList());

        return expenseRepo.saveAll(expenseSummaries);
    }

    // Removed addDailySales and addExpenseSummary methods as reporting service should not directly add data
    // private DailySalesReport addDailySales(DailySalesReport report) {
    //     report.setDate(LocalDate.now());
    //     return salesRepo.save(report);
    // }

    // private ExpenseSummary addExpenseSummary(ExpenseSummary expense) {
    //     expense.setDate(LocalDate.now());
    //     return expenseRepo.save(expense);
    // }
}