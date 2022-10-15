package com.example.proyectopalcos.Controller;

import com.example.proyectopalcos.model.Box;
import com.example.proyectopalcos.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.proyectopalcos.service.BoxService;

import java.util.List;

@RestController
@RequestMapping("/api/Box")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.HEAD, RequestMethod.DELETE, RequestMethod.PUT})
public class BoxController {
    @Autowired
    private BoxService boxService;

    @GetMapping("/all")
    public List<Box> getAll() {
        return boxService.getAll();
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Box save(@RequestBody Box b) {
        return boxService.save(b);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Box update(@RequestBody Box b) {
        return boxService.update(b);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id) {
        return boxService.delete(id);
    }
}
