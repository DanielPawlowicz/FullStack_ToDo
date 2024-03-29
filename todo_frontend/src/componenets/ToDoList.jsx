import axios from 'axios';
import React, { useEffect, useState } from 'react'
import taskService from '../service/TaskService';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import { IconButton } from '@mui/material';


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

    const test = () => {
        console.log("Icon clicked");
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
                            <tr className="taskRow" key={num}>
                                <td><input type="checkbox"/></td>
                                <td className="taskTitle"><p className='taskParagraph'>{t.title}</p></td>
                                {/* <td>{t.date}</td> */}
                                {/* <td>{t.time}</td> */}
                                {/* <td>12.04.2024</td>
                                <td>12:00</td> */}
                                <td className='taskOrder'>{num+1}</td>
                                <td>
                                    <IconButton  onClick={test}>
                                        <BorderColorOutlinedIcon/>
                                    </IconButton>
                                </td>
                                {/* <td><BorderColorOutlinedIcon/></td> */}
                                <td>
                                    <IconButton  onClick={test}>
                                        <DeleteOutlineSharpIcon />
                                    </IconButton>
                                </td>
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