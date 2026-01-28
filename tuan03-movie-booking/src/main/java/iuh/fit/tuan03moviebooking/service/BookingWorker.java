package iuh.fit.tuan03moviebooking.service;

import iuh.fit.tuan03moviebooking.dto.BookingMessage;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class BookingWorker {
    @RabbitListener(queues = "booking-queue")
    public void handle(BookingMessage msg) throws InterruptedException {
        Thread.sleep(3000);
        System.out.println(
                "📧 Email sent to " + msg.getUsername() +
                        " for booking " + msg.getBookingId()
        );
    }
}
