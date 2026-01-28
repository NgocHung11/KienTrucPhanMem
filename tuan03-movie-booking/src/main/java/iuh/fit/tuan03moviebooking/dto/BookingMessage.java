package iuh.fit.tuan03moviebooking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingMessage {
    private Long bookingId;
    private String username;
}
