package com.example.proyectopalcos.service;

import com.example.proyectopalcos.Repository.Crud.AdminRepository;
import com.example.proyectopalcos.model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAll() {
        return adminRepository.getAll();
    }

    public Optional<Admin> getAdmin(int id) {
        return adminRepository.getAdmin(id);
    }

    public Admin save(Admin a) {
        if (a.getIdAdmin() == null) {
            return adminRepository.save(a);
        } else {
            Optional<Admin> e = adminRepository.getAdmin(a.getIdAdmin());
            if (e.isPresent()) {
                return a;
            } else {
                return adminRepository.save(a);
            }
        }
    }

    public Admin update(Admin a) {
        if (a.getIdAdmin() != null) {
            Optional<Admin> q = adminRepository.getAdmin(a.getIdAdmin());
            if (q.isPresent()) {
                if (a.getName() != null) {
                    q.get().setName(a.getName());
                }
                if (a.getEmail() != null) {
                    q.get().setEmail(a.getEmail());
                }
                if (a.getPassword() != null) {
                    q.get().setPassword(a.getPassword());
                }
                adminRepository.save(q.get());
                return q.get();
            } else {
                return a;
            }
        } else {
            return a;
        }
    }

    public boolean delete(int idAdmin) {
        boolean flag = false;
        Optional<Admin> a = adminRepository.getAdmin(idAdmin);
        if (a.isPresent()) {
            adminRepository.delete(a.get());
            flag = true;
        }
        return flag;
    }
}
