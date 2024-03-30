import React, { useState } from 'react'
import taskService from '../service/TaskService';

const AddTask = () => {

  const [task, setTask] = useState({
    title:"",
    // date:"",
    // time:"",
    isDone:false
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setTask({...task, [e.target.name]:value})
  };

  const taskRegister = (e) => {
    e.preventDefault();

    console.log(task);

    taskService
    .saveTask(task)
    .then((res) => {
      console.log("Task added succesfully");
      setTask({
        title:"",
        // date:null,
        // time:null,
        isDone:false
      });

      window.location.reload();

      }).catch((error) => {
      console.log(error);
    })
  };

  return (
    <>
        <div className="formContainer">
            <div className="formCardContainer">
                <form onSubmit={(e) => taskRegister(e)}>
                    <label>Title: <input type="text" name="title" className='form-control' onChange={(e) => handleChange(e)} value={task.name}/></label>
                    {/* <label>Date: <input type="date" name="date" className='form-control' onChange={(e) => handleChange(e)} value={task.date}/></label> */}
                    {/* <label>Time: <input type="time" name="time" className='form-control' onChange={(e) => handleChange(e)} value={task.time}/></label> */}
                    <button className='submitBtn'>Add</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default AddTask