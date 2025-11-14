package com.example.inventoryservice.controller;

import com.example.inventoryservice.entity.Category;
import com.example.inventoryservice.service.CategoryService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> getAll() {
        return categoryService.getAllCategories();
    }

    @PostMapping
    public Category create(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }
}
