package dev.me.paymentservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {

    @GetMapping("/payment")
    public String payment() throws InterruptedException {
        Thread.sleep(10000);
        return "SUCCESS: Thanh toán thành công từ Port 8081!";
    }
}
