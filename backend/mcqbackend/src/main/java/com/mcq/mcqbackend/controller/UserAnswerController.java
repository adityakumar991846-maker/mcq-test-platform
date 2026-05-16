package com.mcq.mcqbackend.controller;

import com.mcq.mcqbackend.entity.UserAnswer;
import com.mcq.mcqbackend.service.UserAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answers")
@CrossOrigin(origins = "*")
public class UserAnswerController {

    @Autowired
    private UserAnswerService service;

    @PostMapping
    public UserAnswer save(@RequestBody UserAnswer answer) {
        return service.save(answer);
    }

    @GetMapping("/{testId}")
    public List<UserAnswer> getAnswers(@PathVariable Long testId) {
        return service.getByTestId(testId);
    }
}