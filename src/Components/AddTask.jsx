import React, { useContext, useEffect, useState } from 'react'
import '../Pages/Styles/AddTask.css'
import { useForm } from 'react-hook-form'
import { PopUpOpened, UserEmail } from '../Context'
import axios from 'axios'

const AddTask = (props) => {

  const [userEmail] = useContext(UserEmail);

  const [formData, setFormData] = useState('');

  const [, setIsPopUpOpened] = useContext(PopUpOpened);

  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm();

  const taskSubmitFn = (data) => {
    setFormData(data);
  }

  useEffect(()=>{
    if (formData !== ""){
      const token = localStorage.getItem('token')
      const fetchData = async () => {
        try {
          if(props.action == "add"){
            const res = await axios.post('http://127.0.0.1:8000/users/task/', formData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            if (res.status == 201){
              setIsPopUpOpened(false);
              props.setState(false);
              props.closeFocused({});
            }
          }
          else {
            const res = await axios.patch(`http://127.0.0.1:8000/users/task/?id=${props.edit.id}`, formData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            if (res.status == 200){
              setIsPopUpOpened(false);
              props.setState(false);
              props.closeFocused({});
            }
          }
        }
        catch (error) {
          console.log(error)
          alert("An error occured while submitting data");
        }
      }
      fetchData();
    }
  },[formData])

  return (
    <div className='add-task'>
      <form onSubmit={handleSubmit(taskSubmitFn)}>
        <h2>{props.action == "add" ? 'Add Task' : "Edit Task"}</h2>
        <button onClick={()=>{props.setState(false); setIsPopUpOpened(false)}} className='cross'>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <input
          type="text"
          placeholder='Username'
          value={userEmail}
          hidden
          {...register('user')}
        />
        <input
          type="text"
          placeholder='Project Name'
          value={props.project}
          hidden
          {...register('project_name')}
        />
        <input
          type="text"
          placeholder='Task Title'
          defaultValue={props.action == "edit" ? props.edit.name : ''}
          {...register('name', {
            required: "Title is required"
          })}
          />
        {errors.name && <p className='error'>{errors.name.message}</p>}
        <input
          type="text"
          placeholder='Description'
          defaultValue={props.action == "edit" ? props.edit.details : ''}
          {...register('details', {
            required: "Description is required"
          })}
          />
          {errors.details && <p className='error'>{errors.details.message}</p>}
        <select
        className='status-select'
          {...register('flag', {
            required: "Status is required"
          })}
        >
          <option value="yellow">Pending</option>
          <option value="red">In Progress</option>
          <option value="green">Completed</option>
        </select>
          {errors.details && <p className='error'>{errors.details.message}</p>}
        <input
          type="datetime-local"
          placeholder='Time to complete'
          defaultValue={props.action === "edit" ? props.edit.time_to_complete ? props.edit.time_to_complete.slice(0, 16) : '' : ''}
          {...register('time_to_complete', {
            required: "This field is required"
          })}
          />
          {errors.time_to_complete && <p className='error'>{errors.time_to_complete.message}</p>}

        <input type="submit" value={props.action == "add" ? 'Add Task' : "Edit Task"} disabled={isSubmitting}/>
      </form>
    </div>
  )
}

export default AddTask
