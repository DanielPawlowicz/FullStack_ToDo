import React, { useEffect, useState } from 'react';
import taskService from '../service/TaskService';
import axios from 'axios';

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    isDone: false
  });

  useEffect(() => {
    fetchMaxTaskOrder();
  }, []);

  const fetchMaxTaskOrder = async () => {
    try {
      const response = await axios.get("http://localhost:8080/count");
      const maxTaskOrder = response.data; // Assuming the API returns the maximum taskOrder value
      const nextTaskOrder = maxTaskOrder + 1;
      setTask(prevState => ({ ...prevState, taskOrder: nextTaskOrder }));
    } catch (error) {
      console.error('Error fetching max task order:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevState => ({ ...prevState, [name]: value }));
  };

  const taskRegister = async (e) => {
    e.preventDefault();
    try {
      await taskService.saveTask(task);
      console.log("Task added successfully");
      setTask({
        title: "",
        isDone: false,
        taskOrder: task.taskOrder + 1 // Increment taskOrder for next task
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="formContainer">
        <div className="formCardContainer">
          <form onSubmit={taskRegister}>
            <label>
              Title:{" "}
              <input
                type="text"
                name="title"
                className="form-control"
                onChange={handleChange}
                value={task.title}
              />
            </label>
            <button className="submitBtn">Add</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTask;
