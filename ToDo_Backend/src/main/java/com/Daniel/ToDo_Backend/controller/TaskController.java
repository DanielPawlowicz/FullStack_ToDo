package com.Daniel.ToDo_Backend.controller;

import com.Daniel.ToDo_Backend.model.Task;
import com.Daniel.ToDo_Backend.repository.TaskRepository;
import com.Daniel.ToDo_Backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/addTask")
    public ResponseEntity<?> newTask(@RequestBody Task newTask){
        return new ResponseEntity<>(taskService.saveTask(newTask), HttpStatus.CREATED);
    }

    


}
