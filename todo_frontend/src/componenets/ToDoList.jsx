import React, { useEffect, useState } from 'react';
import taskService from '../service/TaskService';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import { IconButton } from '@mui/material';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';

const ToDoList = () => {
    const [tasksList, setTasksList] = useState([]);
    const [checkedTasks, setCheckedTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null); // State to track the task being edited
    const [taskCount, setTaskCount] = useState(0);
    // const [order, setOrder] = useState(0);

    const [task, setTask] = useState({
        title: "",
        isDone: false,
        taskOrder: 0
    });
    
    useEffect(() => {
        fetchMaxTaskOrder();
        loadTasks();
    }, []);


// loading tasks
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
            // Sort tasks by order field
            updatedTasks.sort((a, b) => a.taskOrder - b.taskOrder);
            setTasksList(updatedTasks);
            console.log(updatedTasks);
          })
          .catch((error) => {
            console.log(error);
          });
      };


// handling data change 
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

    const deleteTask = async (id) => {
        try {
          await taskService.deleteTask(id);
          // Find the index of the deleted task in the tasksList
          const deletedTaskIndex = tasksList.findIndex(task => task.id === id);
          // Create a new array excluding the deleted task
          const updatedTasks = tasksList.filter(task => task.id !== id);
          // Decrement the taskOrder of following tasks
          updatedTasks.forEach(task => {
            if (task.taskOrder > deletedTaskIndex) {
              task.taskOrder -= 1;
            }
          });
          // Update the tasksList state
          setTasksList(updatedTasks);
          setTaskCount(prevCount => prevCount - 1); // Decrement task count after deletion
        // setOrder(o => --o);
          loadTasks();
        } catch (error) {
          console.log(error);
        }
      };

    const handleUp = (id) => {
        const index = tasksList.findIndex(task => task.id === id);
        if (index > 0) {
            const updatedTasks = [...tasksList];
            const temp = updatedTasks[index].taskOrder;
            updatedTasks[index].taskOrder = updatedTasks[index - 1].taskOrder;
            updatedTasks[index - 1].taskOrder = temp;
            setTasksList(updatedTasks);
            // Update the task order in the database
            updateTaskOrder(updatedTasks);
            console.log(tasksList);
            loadTasks();
        }
    };
    
    const handleDown = (id) => {
        const index = tasksList.findIndex(task => task.id === id);
        if (index < tasksList.length - 1) {
            const updatedTasks = [...tasksList];
            const temp = updatedTasks[index].taskOrder;
            updatedTasks[index].taskOrder = updatedTasks[index + 1].taskOrder;
            updatedTasks[index + 1].taskOrder = temp;
            setTasksList(updatedTasks);
            // Update the task order in the database
            updateTaskOrder(updatedTasks);
            console.log(tasksList);
            loadTasks();
        }
    };
    
    const updateTaskOrder = (updatedTasks) => {
        // Map through the updated tasks to send an API request to update the task order in the database
        updatedTasks.forEach(async (task) => {
            try {
                await taskService.editTask({ ...task });
            } catch (error) {
                console.log("Error updating task:", error);
            }
        });
        console.log(tasksList);
        loadTasks();
    };

    
// ADD TASK ---------------------------------------------------------------------
    
    const fetchMaxTaskOrder = async () => {
        try {
          const response = await axios.get("http://localhost:8080/count");
          const maxTaskOrder = response.data; // Assuming the API returns the maximum taskOrder value
          const nextTaskOrder = maxTaskOrder;
          setTaskCount(maxTaskOrder); // Set task count based on the response
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
            taskOrder: task.taskOrder+1 // Increment taskOrder for next task
          });
          loadTasks();
        } catch (error) {
          console.log(error);
        }
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
                                <td className='iconCol'>
                                        <IconButton onClick={() => handleUp(t.id)} className='arrow'>
                                            <KeyboardArrowUpIcon className='icon'/>
                                        </IconButton>
                                        <IconButton onClick={() => handleDown(t.id)} className='arrow'>
                                            <KeyboardArrowDownIcon className='icon'/>
                                        </IconButton>
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
                        value={task.title}/>
                    </label>
                    <button className="submitBtn">Add</button>
                </form>
            </div>
        </div>
        </>
    );
};

export default ToDoList;
