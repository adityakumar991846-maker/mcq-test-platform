package com.mcq.mcqbackend.controller;

import com.mcq.mcqbackend.dto.LoginRequest;
import com.mcq.mcqbackend.entity.User;
import com.mcq.mcqbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {
    "https://super-cobbler-01e93d.netlify.app",
    "http://127.0.0.1:5500",
    "http://localhost:5500"
})
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}