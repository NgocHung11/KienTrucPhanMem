package iuh.fit.tuan03moviebooking.service;

import iuh.fit.tuan03moviebooking.dto.BookingMessage;
import iuh.fit.tuan03moviebooking.dto.BookingRequest;
import iuh.fit.tuan03moviebooking.model.Booking;
import iuh.fit.tuan03moviebooking.repository.BookingRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {
    @Autowired
    private BookingRepository repo;

    @Autowired
    private RabbitTemplate rabbit;

    public void book(BookingRequest req) {
        Booking booking = new Booking();
        booking.setUsername(req.getUsername());
        booking.setShowtimeId(req.getShowtimeId());

        repo.save(booking);

        BookingMessage msg =
                new BookingMessage(booking.getId(), booking.getUsername());

        rabbit.convertAndSend("booking-queue", msg);
    }
}
