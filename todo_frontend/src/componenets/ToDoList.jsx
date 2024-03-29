import axios from 'axios';
import React, { useEffect, useState } from 'react'
import taskService from '../service/TaskService';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';


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
                        {tasksList.map((t, num) => (
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td>{t.title}</td>
                                {/* <td>{t.date}</td>
                                <td>{t.time}</td> */}
                                <td><BorderColorOutlinedIcon /></td>
                                <td><DeleteOutlineSharpIcon /></td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default ToDoList