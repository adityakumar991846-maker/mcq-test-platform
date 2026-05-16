package com.mcq.mcqbackend.service;

import com.mcq.mcqbackend.entity.Test;
import com.mcq.mcqbackend.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {

    @Autowired
    private TestRepository testRepository;

    public Test createTest(Test test) {
        return testRepository.save(test);
    }

    public List<Test> getUserTests(Long userId) {
        return testRepository.findByUserId(userId);
    }
}