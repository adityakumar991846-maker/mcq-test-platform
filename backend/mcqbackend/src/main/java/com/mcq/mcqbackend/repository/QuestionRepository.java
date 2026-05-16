package com.mcq.mcqbackend.repository;

import com.mcq.mcqbackend.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}