package com.example.proyectopalcos.service;

import com.example.proyectopalcos.Repository.Crud.ScoreRepository;
import com.example.proyectopalcos.model.Score;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll() {
        return scoreRepository.getAll();
    }

    public Optional<Score> getScore(int id) {
        return scoreRepository.getScore(id);
    }

    public Score save(Score s) {
        if (s.getIdScore() == null) {
            return scoreRepository.save(s);
        } else {
            Optional<Score> e = scoreRepository.getScore(s.getIdScore());
            if (e.isPresent()) {
                return s;
            } else {
                return scoreRepository.save(s);
            }
        }
    }

    public Score update(Score s) {
        if (s.getIdScore() != null) {
            Optional<Score> q = scoreRepository.getScore(s.getIdScore());
            if (q.isPresent()) {
                if (s.getMessageText() != null) {
                    q.get().setMessageText(s.getMessageText());
                }
                if (s.getStars() != null) {
                    q.get().setStars(s.getStars());
                }
                scoreRepository.save(q.get());
                return q.get();
            } else {
                return s;
            }
        } else {
            return s;
        }
    }

    public boolean delete(int id) {
        boolean flag = false;
        Optional<Score> s = scoreRepository.getScore(id);
        if (s.isPresent()) {
            scoreRepository.delete(s.get());
            flag = true;
        }
        return flag;
    }
}
