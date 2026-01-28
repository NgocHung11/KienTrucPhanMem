package iuh.fit.tuan03moviebooking.repository;

import iuh.fit.tuan03moviebooking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
}
