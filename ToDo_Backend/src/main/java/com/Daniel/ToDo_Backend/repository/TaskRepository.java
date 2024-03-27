package com.Daniel.ToDo_Backend.repository;

import com.Daniel.ToDo_Backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>{

//    @Query("SELECT MAX(t.order) FROM Task t")
//    Integer findMaxOrder();
}
