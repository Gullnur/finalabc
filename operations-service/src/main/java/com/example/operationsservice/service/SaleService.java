package com.example.operationsservice.service;

import com.example.operationsservice.entity.Sale;
import com.example.operationsservice.entity.SaleStatus; // Added import
import com.example.operationsservice.exception.ResourceNotFoundException; // Added import
import com.example.operationsservice.repository.SaleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SaleService {
    private final SaleRepository repository;

    public SaleService(SaleRepository repository) {
        this.repository = repository;
    }

    public List<Sale> getAllSales() {
        return repository.findAll();
    }

    public Sale createSale(Sale sale) {
        sale.setSaleDate(LocalDateTime.now());
        // Ensure status is valid if it's an enum
        if (sale.getStatus() == null) {
            sale.setStatus(SaleStatus.COMPLETED); // Default status
        }
        return repository.save(sale);
    }

    public void deleteSale(Long id) {
        // Check if the sale exists before deleting
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Sale not found with id " + id);
        }
        repository.deleteById(id);
    }
}
