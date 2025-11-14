package com.example.reportingservice.repository;

import com.example.reportingservice.entity.DailySalesReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailySalesReportRepository extends JpaRepository<DailySalesReport, Long> {}
