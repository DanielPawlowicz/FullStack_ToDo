package com.Daniel.ToDo_Backend.repository;

import com.Daniel.ToDo_Backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long>{
}
