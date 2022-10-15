package com.example.proyectopalcos.service;

import com.example.proyectopalcos.Repository.Crud.ReservationRepository;
import com.example.proyectopalcos.model.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll() {
        return reservationRepository.getAll();
    }

    public Optional<Reservation> getReservation(int idReservation) {
        return reservationRepository.getReservation(idReservation);
    }

    public Reservation save(Reservation r) {
        if (r.getIdReservation() == null) {
            return reservationRepository.save(r);
        } else {
            Optional<Reservation> e = reservationRepository.getReservation(r.getIdReservation());
            if (e.isPresent()) {
                return r;
            } else {
                return reservationRepository.save(r);
            }
        }
    }

    public Reservation update(Reservation r) {
        if (r.getIdReservation() != null) {
            Optional<Reservation> q = reservationRepository.getReservation(r.getIdReservation());
            if (q.isPresent()) {
                if (r.getStartDate() != null) {
                    q.get().setStartDate(r.getStartDate());
                }
                if (r.getDevolutionDate() != null) {
                    q.get().setDevolutionDate(r.getDevolutionDate());
                }
                if (r.getStatus() != null) {
                    q.get().setStatus(r.getStatus());
                }
                reservationRepository.save(q.get());
                return q.get();
            } else {
                return r;
            }
        } else {
            return r;
        }
    }

    public boolean delete(int idReservation) {
        boolean flag = false;
        Optional<Reservation> r = reservationRepository.getReservation(idReservation);
        if (r.isPresent()) {
            reservationRepository.delete(r.get());
            flag = true;
        }
        return flag;
    }
}
