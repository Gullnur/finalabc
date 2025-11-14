package com.example.inventoryservice.service;


import com.example.inventoryservice.entity.Product;
import com.example.inventoryservice.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getProductsByCategory(String categoryName) {
        return productRepository.findByCategory_Name(categoryName);
    }
}
