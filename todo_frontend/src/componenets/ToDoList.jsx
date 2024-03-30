import React, { useEffect, useState } from 'react';
import taskService from '../service/TaskService';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import { IconButton } from '@mui/material';
import SaveAsIcon from '@mui/icons-material/SaveAs';

const ToDoList = () => {
    const [tasksList, setTasksList] = useState([]);
    const [checkedTasks, setCheckedTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null); // State to track the task being edited

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {
        taskService
            .getAllTask()
            .then((res) => {
                const updatedTasks = res.data.map(task => {
                    if (task.done) {
                        setCheckedTasks(prevCheckedTasks => [...prevCheckedTasks, task.id]);
                    } else {
                        setCheckedTasks(prevCheckedTasks => prevCheckedTasks.filter(id => id !== task.id));
                    }
                    return task;
                });
                setTasksList(updatedTasks);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCheck = async (taskId) => {
        try {
            const updatedTask = tasksList.find(task => task.id === taskId);
            if (!updatedTask) {
                throw new Error("Task not found");
            }
    
            const updatedTaskData = { ...updatedTask, done: !updatedTask.done };
            await taskService.editTask(updatedTaskData);
            loadTasks();
        } catch (error) {
            console.log("Error updating task:", error);
        }
    };

    const handleEditClick = (taskId) => {
        setEditingTaskId(taskId); // Set the editing task ID when edit icon is clicked
    };

    const handleTextareaChange = (event, taskId) => {
        const updatedTasks = tasksList.map(task => {
            if (task.id === taskId) {
                return { ...task, title: event.target.value };
            }
            return task;
        });
        setTasksList(updatedTasks);
    };

    const handleSaveClick = async (taskId) => {
        const editedTask = tasksList.find(task => task.id === taskId);
        if (!editedTask) {
            return; // Task not found, do nothing
        }

        try {
            await taskService.editTask(editedTask);
            setEditingTaskId(null); // Reset editing task ID after saving
            loadTasks(); // Reload tasks after saving
        } catch (error) {
            console.log("Error saving task:", error);
        }
    };

    const handleTextareaKeyPress = (event, taskId) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior of Enter key
            handleSaveClick(taskId); // Call save function when Enter key is pressed
        }
    };

    const deleteTask = (id) => {
        taskService
        .deleteTask(id)
        .then(() => {
            loadTasks();
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="container">
            <div className="listHeader">
                <h1>To Do List</h1>
            </div>
            <div className="listBody">
                <table>
                    <tbody>
                        {
                        tasksList.map((t, num) => (
                            <tr className={checkedTasks.includes(t.id) ? 'checked' : ''} key={num}>
                                <td><input type="checkbox" checked={checkedTasks.includes(t.id)} onChange={() => handleCheck(t.id)}/></td>
                                <td className="taskTitle">
                                    {/* Render textarea if the task is being edited, else render paragraph */}
                                    {
                                        editingTaskId === t.id ? (
                                            <textarea
                                                className='taskTextarea'
                                                value={t.title}
                                                onChange={(event) => handleTextareaChange(event, t.id)}
                                                onKeyDown={(event) => handleTextareaKeyPress(event, t.id)} // Add key press event listener
                                            />
                                        ) : ( <p className='taskParagraph'>{t.title}</p> )
                                    }
                                </td>
                                {/* <td className='taskOrder'>{num+1}</td> */}
                                <td>
                                    {/* Render edit icon if task is not being edited, else render save icon */}
                                    {editingTaskId === t.id ? (
                                        <IconButton onClick={() => handleSaveClick(t.id)}>
                                            <SaveAsIcon className='saveIcon'/>
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={() => handleEditClick(t.id)}>
                                            <BorderColorOutlinedIcon className='icon'/>
                                        </IconButton>
                                    )}
                                    <IconButton onClick={() => deleteTask(t.id)} >
                                        <DeleteOutlineSharpIcon className='icon'/>
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ToDoList;
