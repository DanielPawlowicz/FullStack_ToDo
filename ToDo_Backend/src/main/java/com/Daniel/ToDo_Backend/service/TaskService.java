package com.Daniel.ToDo_Backend.service;

import com.Daniel.ToDo_Backend.model.Task;

import java.util.List;

public interface TaskService {

    public Task saveTask(Task task);

    public List<Task> getAllTask();

    public Task getTaskById(Long id);

    public String deleteTask(Long id);

    public Task editTask(Task task, Long id);
}
