package com.example.proyectopalcos.service;

import com.example.proyectopalcos.Repository.Crud.BoxRepository;
import com.example.proyectopalcos.model.Box;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoxService {
    @Autowired
    private BoxRepository boxRepository;

    public List<Box> getAll() {
        return boxRepository.getAll();
    }

    public Optional<Box> getBox(int id) {
        return boxRepository.getBox(id);
    }

    public Box save(Box b) {
        if (b.getId() == null) {
            return boxRepository.save(b);
        } else {
            Optional<Box> e = boxRepository.getBox(b.getId());
            if (e.isPresent()) {
                return b;
            } else {
                return boxRepository.save(b);
            }
        }
    }

    public Box update(Box b) {
        if (b.getId() != null) {
            Optional<Box> q = boxRepository.getBox(b.getId());
            if (q.isPresent()) {
                if (b.getName() != null) {
                    q.get().setName(b.getName());
                }
                if (b.getLocation() != null) {
                    q.get().setLocation(b.getLocation());
                }
                if (b.getCapacity() != null) {
                    q.get().setCapacity(b.getCapacity());
                }
                if (b.getDescription() != null) {
                    q.get().setDescription(b.getDescription());
                }
                boxRepository.save(q.get());
                return q.get();
            } else {
                return b;
            }
        } else {
            return b;
        }
    }

    public boolean delete(int id) {
        boolean flag = false;
        Optional<Box> b = boxRepository.getBox(id);
        if (b.isPresent()) {
            boxRepository.delete(b.get());
            flag = true;
        }
        return flag;
    }
}
