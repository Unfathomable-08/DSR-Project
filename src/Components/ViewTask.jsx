import React, { useContext, useEffect, useState } from 'react'
import '../Pages/Styles/ViewTask.css'
import { PopUpOpened } from '../Context'
import AddTask from './AddTask';
import axios from 'axios';

const ViewTask = (props) => {

    const [, setIsPopUpOpened] = useContext(PopUpOpened);
    const [data, setData] = useState([]);

    const [editPagaOpened, setEditPageOpened] = useState(false);
    const [edit, setEdit] = useState('');

    const updateTask = (data) => {
        setEditPageOpened(true);
        setEdit(data)
    }

    const delateTask = async (data) => {
        const token = localStorage.getItem('token');
            try {
                const res = await axios.delete(`http://127.0.0.1:8000/users/task/?id=${data.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(res)
                if (res.status == 204){
                    setIsPopUpOpened(false);
                    props.setState(false);
                }
            }
            catch (error){
                console.log(error)
            }
    }

    useEffect(()=>{
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(`http://127.0.0.1:8000/users/task/?project=${props.project}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(res.data);
            }
            catch (error){
                console.log(error)
            }
        }
        fetchData();
    },[editPagaOpened])

  return (
    <div className='view-task'>
        <div className="view-task-div">
            <h1>{ props.project }</h1>
            <button onClick={()=>{props.setState(false); setIsPopUpOpened(false);}} className='cross'>
            <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="tasks">
                {data.map((data, index)=>{
                    return(
                        <div className="task-cont" key={index}>
                            <div className="task">
                                <h3>{ data.name }</h3>
                                <b>Created On: <span>{ data.created_at.split('T')[0] + " " + data.created_at.split('T')[1].split(':')[0] + ':' + data.created_at.split('T')[1].split(':')[1] }</span></b><br />
                                <b>Due Date: <span>{ data.time_to_complete.split('T')[0] + " " + data.time_to_complete.split('T')[1].split(':')[0] + ':' + data.time_to_complete.split('T')[1].split(':')[1] }</span></b>
                                <p>
                                    {data.details.split(" ").slice(0, 20).join(" ")}
                                    {data.details.split(" ").length > 20 && <b className='dots'> ...</b>}
                                </p>
                            </div>
                            <div className="task-btn-cont">
                                <button className='task-btn' onClick={()=>updateTask(data)}>Edit</button>
                                <button className='task-btn' onClick={()=>delateTask(data)}>Delete</button>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
        {
            editPagaOpened && <AddTask className="editTask" setState={setEditPageOpened} project={props.project} action="edit" edit={edit} already={data}/>
        }
    </div>
  )
}

export default ViewTask
