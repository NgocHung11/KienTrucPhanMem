package dev.me.paymentservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {

    @GetMapping("/payment")
    public String payment() {
        return "SUCCESS: Thanh toán thành công từ Port 8081!";
    }
}
