package iuh.fit.tuan03moviebooking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(indexes = @Index(columnList = "startTime"))
public class Showtime {
    @Id
    @GeneratedValue
    private Long id;
    private LocalDateTime startTime;
}
