package com.Daniel.ToDo_Backend.controller;

import com.Daniel.ToDo_Backend.model.Task;
import com.Daniel.ToDo_Backend.repository.TaskRepository;
import com.Daniel.ToDo_Backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/addTask")
    public ResponseEntity<?> newTask(@RequestBody Task newTask){
        return new ResponseEntity<>(taskService.saveTask(newTask), HttpStatus.CREATED);
    }

    @GetMapping("/allTasks")
    public ResponseEntity<?> getAllTask(){
        return new ResponseEntity<>(taskService.getAllTask(), HttpStatus.OK);
    }

    @GetMapping("/Task/{id}")
    public ResponseEntity<?> getAllTask(@PathVariable Long id){
        return new ResponseEntity<>(taskService.getTaskById(id), HttpStatus.OK);
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id){
        return new ResponseEntity<>(taskService.deleteTask(id), HttpStatus.OK);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editTask(@RequestBody Task newTask, @PathVariable Long id){
        return new ResponseEntity<>(taskService.editTask(newTask, id), HttpStatus.OK);
    }

}
