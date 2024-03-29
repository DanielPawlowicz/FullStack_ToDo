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
        return axios.put(API_URL + "/edit/" + task.id, task);
    }

}

export default new TaskService;