package iuh.fit.tuan03moviebooking.controller;

import iuh.fit.tuan03moviebooking.dto.MovieResponse;
import iuh.fit.tuan03moviebooking.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {
    @Autowired
    private MovieService service;

    @GetMapping
    public List<MovieResponse> getMovies() {
        return service.getMovies()
                .stream()
                .map(m -> new MovieResponse(m.getId(), m.getTitle()))
                .toList();
    }
}
