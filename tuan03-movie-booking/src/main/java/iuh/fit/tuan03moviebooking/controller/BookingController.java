package iuh.fit.tuan03moviebooking.controller;

import iuh.fit.tuan03moviebooking.dto.BookingRequest;
import iuh.fit.tuan03moviebooking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BookingController {
    @Autowired
    private BookingService service;

    @PostMapping("/book")
    public String book(@RequestBody BookingRequest req) {
        service.book(req);
        return "Booking success!";
    }
}
