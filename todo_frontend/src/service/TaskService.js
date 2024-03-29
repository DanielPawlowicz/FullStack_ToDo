import axios from "axios";

const API_URL = "http://localhost:8080"; 

class TaskService {

    saveTask(task) {
        return axios.post(API_URL + "/addTask", task);
    }

    getAllTask () {
        return axios.get(API_URL + "/allTasks");
    }

    getTaskById(id) {
        return axios.get(API_URL + "/Task/" + id);
    }

    deleteTask(id) {
        return axios.delete(API_URL + "/Delete/" + id);
    }

    editTask(task) {
        // Destructure the task object to get the id and isDone fields
        const { id, done } = task;
        // Create a new task object with only the isDone field
        const updatedTask = { done };
        // Send a PUT request to update the task with the specified id
        return axios.put(API_URL + "/edit/" + id, updatedTask);
    }

}

export default new TaskService;