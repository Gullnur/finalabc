package com.example.operationsservice.controller;

import com.example.operationsservice.entity.Sale;
import com.example.operationsservice.service.SaleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

    private final SaleService service;

    public SaleController(SaleService service) {
        this.service = service;
    }

    @GetMapping
    public List<Sale> getAll() {
        return service.getAllSales();
    }

    @PostMapping
    public Sale create(@RequestBody Sale sale) {
        return service.createSale(sale);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteSale(id);
    }
}
