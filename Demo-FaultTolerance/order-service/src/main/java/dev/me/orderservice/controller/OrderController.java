package dev.me.orderservice.controller;

import dev.me.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/checkout")
    public String checkout() {
        return orderService.makePayment();
    }
}
