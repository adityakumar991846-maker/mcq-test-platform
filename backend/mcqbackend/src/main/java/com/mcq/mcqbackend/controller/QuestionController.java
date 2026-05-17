package com.mcq.mcqbackend.controller;

import com.mcq.mcqbackend.entity.Question;
import com.mcq.mcqbackend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = {
    "https://super-cobbler-01e93d.netlify.app",
    "http://127.0.0.1:5500",
    "http://localhost:5500"
})
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping
    public Question saveQuestion(@RequestBody Question question) {
        return questionService.saveQuestion(question);
    }

    @GetMapping
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }
}