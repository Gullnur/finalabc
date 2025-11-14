package com.example.operationsservice;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource; // Added import

@SpringBootTest
@TestPropertySource(properties = {
        "spring.security.enabled=false", // Disable Spring Security for this test
        "eureka.client.enabled=false" // Disable Eureka client for this test
})
class OperationsServiceApplicationTests {

    @Test
    void contextLoads() {
        // This test simply checks if the Spring application context can load successfully.
        // No specific beans are injected or tested here.
    }

}