package com.mcq.mcqbackend.service;

import com.mcq.mcqbackend.dto.LoginRequest;
import com.mcq.mcqbackend.entity.User;
import com.mcq.mcqbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user) {
        return userRepository.save(user);
    }

    public User login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail());

        if (user != null && user.getPassword().equals(request.getPassword())) {
            return user;
        }

        return null;
    }
}