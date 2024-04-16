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
    // State variables
    const [tasksList, setTasksList] = useState([]); // State to store list of tasks
    const [checkedTasks, setCheckedTasks] = useState([]); // State to store list of checked tasks
    const [editingTaskId, setEditingTaskId] = useState(null); // State to track the task being edited
    const [taskCount, setTaskCount] = useState(0); // State to store task count
    const [task, setTask] = useState({ // State to store new task data
        title: "",
        isDone: false,
        taskOrder: 0
    });
    
    useEffect(() => {
        fetchMaxTaskOrder(); // Fetch maximum task order when component mounts
        loadTasks(); // Load tasks when component mounts
    }, []);


// Function to load tasks
    const loadTasks = () => {
        // Fetch tasks from service
        taskService.getAllTask()
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
            setTasksList(updatedTasks); // Update tasksList state with fetched tasks
          })
          .catch((error) => {
            console.log(error);
          });
      };


// Function to handle task checkbox click
    const handleCheck = async (taskId) => {
        try {
            const updatedTask = tasksList.find(task => task.id === taskId);
            if (!updatedTask) {
                throw new Error("Task not found");
            }
    
            const updatedTaskData = { ...updatedTask, done: !updatedTask.done };
            await taskService.editTask(updatedTaskData); // Update task status
            loadTasks(); // Reload tasks after updating
        } catch (error) {
            console.log("Error updating task:", error);
        }
    };

    // Function to handle click on edit icon
    const handleEditClick = (taskId) => {
        setEditingTaskId(taskId); // Set the editing task ID when edit icon is clicked
    };

    // Function to handle textarea change
    const handleTextareaChange = (event, taskId) => {
        const updatedTasks = tasksList.map(task => {
            if (task.id === taskId) {
                return { ...task, title: event.target.value };
            }
            return task;
        });
        setTasksList(updatedTasks); // Update tasksList state with edited task
    };

    // Function to handle save click
    const handleSaveClick = async (taskId) => {
        const editedTask = tasksList.find(task => task.id === taskId);
        if (!editedTask) {
            return; // Task not found, do nothing
        }

        try {
            await taskService.editTask(editedTask); // Save edited task
            setEditingTaskId(null); // Reset editing task ID after saving
            loadTasks(); // Reload tasks after saving
        } catch (error) {
            console.log("Error saving task:", error);
        }
    };

    // Function to handle key press in textarea
    const handleTextareaKeyPress = (event, taskId) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior of Enter key
            handleSaveClick(taskId); // Call save function when Enter key is pressed
        }
    };

    // Function to delete task
    const deleteTask = async (id) => {
        try {
            await taskService.deleteTask(id); // Delete task
            const filteredTasks = tasksList.filter(task => task.id !== id); // Filter out the deleted task
            const updatedTasks = filteredTasks.map((task, index) => ({ ...task, taskOrder: index + 1 })); // Update task order values
            setTasksList(updatedTasks); // Update tasksList state with updated task order
            updateTaskOrder(updatedTasks); // Update task order in the database
        } catch (error) {
            console.log(error);
        }
        loadTasks(); // Reload tasks after deleting
        loadTasks();
    };
    
    // Function to move task up
    const handleUp = (id) => {
        const index = tasksList.findIndex(task => task.id === id);
        if (index > 0) {
            const updatedTasks = [...tasksList];
            const temp = updatedTasks[index].taskOrder;
            updatedTasks[index].taskOrder = updatedTasks[index - 1].taskOrder;
            updatedTasks[index - 1].taskOrder = temp;
            setTasksList([...updatedTasks]);
            updateTaskOrder(updatedTasks); // Update task order in the database
            loadTasks(); // Reload tasks after updating
            loadTasks();
        }
    };
    
    // Function to move task down
    const handleDown = (id) => {
        const index = tasksList.findIndex(task => task.id === id);
        if (index < tasksList.length - 1) {
            const updatedTasks = [...tasksList];
            const temp = updatedTasks[index].taskOrder;
            updatedTasks[index].taskOrder = updatedTasks[index + 1].taskOrder;
            updatedTasks[index + 1].taskOrder = temp;
            setTasksList([...updatedTasks]);
            updateTaskOrder(updatedTasks); // Update task order in the database
            loadTasks(); // Reload tasks after updating
            loadTasks();
        }
    };
    
    // Function to update task order
    const updateTaskOrder = (updatedTasks) => {
        // Map through the updated tasks to send an API request to update the task order in the database
        updatedTasks.forEach(async (task) => {
            try {
                await taskService.editTask({ ...task });
            } catch (error) {
                console.error("Error updating task:", error);
            }
        });
        loadTasks();  // Reload tasks after updating
    };

    
// ADD TASK ---------------------------------------------------------------------
    
    // Function to fetch maximum task order
    const fetchMaxTaskOrder = async () => {
        try {
          const response = await taskService.getCount();
          const maxTaskOrder = response.data;
          const nextTaskOrder = maxTaskOrder;
          setTaskCount(maxTaskOrder); // Set task count based on the response
          setTask(prevState => ({ ...prevState, taskOrder: nextTaskOrder }));
        } catch (error) {
          console.error('Error fetching max task order:', error);
        }
      };
    
      // Function to handle change in input fields
      const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prevState => ({ ...prevState, [name]: value }));
      };
    
      // Function to register new task
      const taskRegister = async (e) => {
        e.preventDefault();
        try {
          await taskService.saveTask(task);  // Save new task
          setTask({
            title: "",
            isDone: false,
            taskOrder: task.taskOrder + 1 // Increment taskOrder for next task
          });

          loadTasks();// Reload tasks after adding new task

        } catch (error) {
          console.error(error);
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
                        {/* Map through tasks and render each task */}
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
