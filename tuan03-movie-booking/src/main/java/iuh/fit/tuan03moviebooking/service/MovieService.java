package iuh.fit.tuan03moviebooking.service;

import iuh.fit.tuan03moviebooking.model.Movie;
import iuh.fit.tuan03moviebooking.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class MovieService {
    @Autowired
    RedisTemplate<String, Object> redis;

    @Autowired
    MovieRepository repo;

    public List<Movie> getMovies() {
        var cached = redis.opsForValue().get("movies");
        if (cached != null) {
            System.out.println("🔥 Redis hit");
            return (List<Movie>) cached;
        }

        var movies = repo.findAll();
        redis.opsForValue().set("movies", movies, 5, TimeUnit.MINUTES);
        return movies;
    }
}
