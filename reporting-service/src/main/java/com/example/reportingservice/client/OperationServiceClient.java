package com.example.reportingservice.client;

import com.example.reportingservice.dto.ExpenseDTO;
import com.example.reportingservice.dto.SaleDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "operations-service")
public interface OperationServiceClient {

    @GetMapping("/api/expenses")
    List<ExpenseDTO> getAllExpenses();

    @GetMapping("/api/sales")
    List<SaleDTO> getAllSales();
}
