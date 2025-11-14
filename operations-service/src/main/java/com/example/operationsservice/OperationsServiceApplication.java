package com.example.operationsservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient // Added to enable Eureka client
@SpringBootApplication
public class OperationsServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(OperationsServiceApplication.class, args);
    }

}
