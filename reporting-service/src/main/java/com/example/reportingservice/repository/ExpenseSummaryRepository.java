package com.example.reportingservice.repository;

import com.example.reportingservice.entity.ExpenseSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseSummaryRepository extends JpaRepository<ExpenseSummary, Long> {}
