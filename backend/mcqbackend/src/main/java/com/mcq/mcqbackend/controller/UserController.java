package com.mcq.mcqbackend.controller;

import com.mcq.mcqbackend.entity.User;
import com.mcq.mcqbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userRepository.findByEmailAndPassword(
                user.getEmail(),
                user.getPassword()
        );
    }
}