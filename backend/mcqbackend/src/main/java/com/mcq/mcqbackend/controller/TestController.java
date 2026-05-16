package com.mcq.mcqbackend.controller;

import com.mcq.mcqbackend.entity.Test;
import com.mcq.mcqbackend.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
@CrossOrigin(origins = "*")
public class TestController {

    @Autowired
    private TestService testService;

    @PostMapping
    public Test createTest(@RequestBody Test test) {
        return testService.createTest(test);
    }

    @GetMapping("/history/{userId}")
    public List<Test> getHistory(@PathVariable Long userId) {
        return testService.getUserTests(userId);
    }
}