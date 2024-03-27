package com.Daniel.ToDo_Backend.service;

import com.Daniel.ToDo_Backend.controller.exception.TaskNotFoundException;
import com.Daniel.ToDo_Backend.model.Task;
import com.Daniel.ToDo_Backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService{

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task saveTask(Task newTask) {
//        // Find the maximum order value currently in the database
//        Integer maxOrder = taskRepository.findMaxOrder();
//
//        // If there are no tasks yet, set the order to 1
//        if (maxOrder == null) {
//            newTask.setTaskOrder(1);
//        } else {
//            // Otherwise, increment the maximum order value by one
//            newTask.setTaskOrder(maxOrder + 1);
//        }
        return taskRepository.save(newTask);
    }

    @Override
    public List<Task> getAllTask() {
        return taskRepository.findAll();
    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(()->new TaskNotFoundException(id));
    }

    @Override
    public String deleteTask(Long id) {
        return null;
    }

    @Override
    public Task editTask(Task task, Long id) {
        return null;
    }
}
