package com.mcq.mcqbackend.repository;

import com.mcq.mcqbackend.entity.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {
    List<UserAnswer> findByTestId(Long testId);
}