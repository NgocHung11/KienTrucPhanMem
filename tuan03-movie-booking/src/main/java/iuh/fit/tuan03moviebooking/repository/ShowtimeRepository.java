package iuh.fit.tuan03moviebooking.repository;

import iuh.fit.tuan03moviebooking.model.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
}
