package com.Daniel.ToDo_Backend.controller.exception;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(Long id) {
        super("Could not find the task with id "+id);
    }
}
