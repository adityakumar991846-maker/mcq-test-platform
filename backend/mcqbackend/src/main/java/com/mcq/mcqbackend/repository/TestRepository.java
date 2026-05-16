package com.mcq.mcqbackend.repository;

import com.mcq.mcqbackend.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestRepository extends JpaRepository<Test, Long> {
    List<Test> findByUserId(Long userId);
}