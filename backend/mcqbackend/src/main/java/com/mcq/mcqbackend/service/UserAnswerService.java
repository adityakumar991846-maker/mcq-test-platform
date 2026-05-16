package com.mcq.mcqbackend.service;

import com.mcq.mcqbackend.entity.UserAnswer;
import com.mcq.mcqbackend.repository.UserAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAnswerService {

    @Autowired
    private UserAnswerRepository repository;

    public UserAnswer save(UserAnswer answer) {
        return repository.save(answer);
    }

    public List<UserAnswer> getByTestId(Long testId) {
        return repository.findByTestId(testId);
    }
}