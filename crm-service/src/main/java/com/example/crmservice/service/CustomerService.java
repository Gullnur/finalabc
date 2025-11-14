package com.example.crmservice.service;

import com.example.crmservice.entity.Customer;
import com.example.crmservice.entity.CustomerStatus;
import com.example.crmservice.exception.ResourceNotFoundException;
import com.example.crmservice.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository repository;

    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }

    public Optional<Customer> getCustomerById(Long id) {
        return repository.findById(id);
    }

    public Customer createCustomer(Customer customer) {
        if (repository.existsByEmail(customer.getEmail())) {
            throw new IllegalArgumentException("Email artıq mövcuddur!");
        }
        customer.setStatus(CustomerStatus.ACTIVE);
        return repository.save(customer);
    }

    public Customer updateCustomer(Long id, Customer updated) {
        return repository.findById(id)
                .map(existing -> {
                    if (updated.getName() != null) {
                        existing.setName(updated.getName());
                    }
                    if (updated.getPhone() != null) {
                        existing.setPhone(updated.getPhone());
                    }
                    if (updated.getAddress() != null) {
                        existing.setAddress(updated.getAddress());
                    }
                    if (updated.getStatus() != null) {
                        existing.setStatus(updated.getStatus());
                    }
                    return repository.save(existing);
                })
                .orElseThrow(() -> new ResourceNotFoundException("Müştəri tapılmadı!"));
    }

    public void deleteCustomer(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Müştəri tapılmadı!");
        }
        repository.deleteById(id);
    }
}