package iuh.fit.tuan03moviebooking.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.core.Queue;
@Configuration
public class RabbitMQConfig {
    @Bean
    public Queue bookingQueue() {
        return new Queue("booking-queue");
    }
}
