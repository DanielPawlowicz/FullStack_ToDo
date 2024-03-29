import axios from 'axios';
import React, { useEffect, useState } from 'react'
import taskService from '../service/TaskService';

const ToDoList = () => {

    const [tasksList, setTasksList] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {
        taskService
        .getAllTask()
        .then((res) => {
            console.log(res.data);
            setTasksList(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

  return (
    <>
        <div className="container">
            <div className="listHeader">
                <h1>To Do List</h1>
            </div>
            <div className="listBody">
                <table>
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default ToDoList