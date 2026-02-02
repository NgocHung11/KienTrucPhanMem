package dev.me.orderservice.service;

import io.github.resilience4j.bulkhead.annotation.Bulkhead;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OrderService {
    private final RestTemplate restTemplate = new RestTemplate();

    // Thêm fallbackMethod vào tất cả các annotation để bắt lỗi mọi tầng
    @CircuitBreaker(name = "paymentService", fallbackMethod = "fallback")
    @Retry(name = "paymentService", fallbackMethod = "fallback")
    @RateLimiter(name = "paymentService", fallbackMethod = "fallback")
    @Bulkhead(name = "paymentService", fallbackMethod = "fallback")
    public String makePayment() {
        return restTemplate.getForObject("http://localhost:8081/payment", String.class);
    }

    /**
     * Hàm dự phòng (Fallback)
     * Quan trọng: Phải có tham số Throwable t để Resilience4j nhận diện đúng.
     */
    public String fallback(Throwable t) {
        return "FALLBACK: Hệ thống đang quá tải hoặc Service Payment đã sập! (Lỗi chi tiết: " + t.getMessage() + ")";
    }
}