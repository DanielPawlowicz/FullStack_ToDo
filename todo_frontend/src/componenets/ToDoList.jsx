import axios from 'axios';
import React, { useEffect, useState } from 'react'
import taskService from '../service/TaskService';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import { IconButton } from '@mui/material';


const ToDoList = () => {

    const [tasksList, setTasksList] = useState([]);

    const [checkedTasks, setCheckedTasks] = useState([]);

    const handleCheck = (taskId) => {
        // const isChecked = checkedTasks.includes(taskId);
        // if (isChecked) {
        // setCheckedTasks(checkedTasks.filter(id => id !== taskId));
        // } else {
        // setCheckedTasks([...checkedTasks, taskId]);
        // }

        const updatedTasks = tasksList.map(task => {
            if (task.id === taskId) {
                const updatedTask = { ...task, done: !task.done };
                console.log("Updated task:", updatedTask); // Log the updated task
                taskService.editTask(updatedTask)
                    .then(() => {
                        console.log("Task updated successfully");
                        return updatedTask; // Return updatedTask after updating
                    })
                    .catch((error) => {
                        console.log("Error updating task:", error);
                        return task; // Return the original task in case of error
                    });
            }
            return task;
        });
    
        setTasksList(updatedTasks);
    
        // Update checkedTasks state
        const isChecked = checkedTasks.includes(taskId);
        if (isChecked) {
            setCheckedTasks(checkedTasks.filter(id => id !== taskId));
        } else {
            setCheckedTasks([...checkedTasks, taskId]);
        }
    };

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

    const deleteTask = (id) => {
        taskService
        .deleteTask(id)
        .then((res) => {
            console.log("task deleted sucessfully");
            loadTasks();
        })
        .catch((error) => {
            console.log(error);
        });
    };

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
                            <tr className={checkedTasks.includes(t.id) ? 'checked' : ''} key={num}>
                                <td><input type="checkbox" checked={checkedTasks.includes(t.id)} onChange={() => handleCheck(t.id)}/></td>
                                <td className="taskTitle"><p className='taskParagraph'>{t.title}</p></td>
                                {/* <td>{t.date}</td> */}
                                {/* <td>{t.time}</td> */}
                                {/* <td>12.04.2024</td>
                                <td>12:00</td> */}
                                <td className='taskOrder'>{num+1}</td>
                                <td>
                                    <IconButton  onClick={test}>
                                        <BorderColorOutlinedIcon className='icon'/>
                                    </IconButton>
                                {/* <td><BorderColorOutlinedIcon/></td> */}
                                    <IconButton  onClick={() => deleteTask(t.id)} >
                                        <DeleteOutlineSharpIcon className='icon'/>
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