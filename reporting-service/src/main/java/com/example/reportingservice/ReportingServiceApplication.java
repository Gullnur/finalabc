package com.example.reportingservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients; // Added import

@EnableDiscoveryClient // Added to enable Eureka client
@EnableFeignClients // Added to enable Feign clients
@SpringBootApplication
public class ReportingServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReportingServiceApplication.class, args);
    }

}

// yoxlayin ozum gerisini edecem mlm sizi daha da yormayim coox sag olun