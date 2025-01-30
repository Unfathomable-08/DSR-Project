import React, { useEffect, useState } from 'react'
import './Styles/Developer.css'
import img from '../assets/avatar2.jpg'
import axios from 'axios';
import Navbar from '../Components/Navbar'

const Developer = () => {
    const [data, setData] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [focusedProject, setFocusedProject] = useState({})

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token){
          const fetchData = async () => {
            try {
              const res = await axios.get('http://127.0.0.1:8000/users/projects/', {
                headers: {
                  'Authorization': `Bearer ${token})}`
                }
              }); 
              setData(res.data.data)
            } catch (error) {
              alert('An error occured while sending data!')
              console.error(error);
            }
          };
          fetchData();
        }
      },[]);

      useEffect(()=>{
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(`http://127.0.0.1:8000/users/task/?project=${focusedProject.name}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTasks(res.data);
            }
            catch (error){
                console.log(error)
            }
        }
        fetchData();
        console.log(focusedProject)
    },[focusedProject])

  return (
    <div>
        <Navbar/>
      <section className='project-header'>
        <img src={img} alt="" />
        <div>
            <i className='fa-solid fa-list'></i>
            <div>
                <b>Pending Task</b>
                <p>0</p>
            </div>
        </div>
        <div>
            <i className='fa-solid fa-check' style={{backgroundColor: '#001696', color: 'white', borderRadius: "50%", padding: '2px 3px', fontSize: '14px'}}></i>
            <div>
                <b>Completed Task</b>
                <p>0</p>
            </div>
        </div>
        <div>
            <i className='fa-solid fa-clock'></i>
            <div>
                <b>Total Hours Logged</b>
                <p>120 hours</p>
            </div>
        </div>
      </section>
      <section className={focusedProject.name ? 'projects-grid' : 'project-grid-opened'}>
        <section className='projects-names'>
            <h1>
                Projects
            </h1>
            {
                data.map((data, index)=>{
                    return(
                        <div key={index} onClick={()=>setFocusedProject(data)}>
                            { data.name }
                        </div>
                    )
                })
            }
        </section>
        <section className={`project-details ${focusedProject.name ? '' : 'hidden'}`}>
            <h1>{ focusedProject.name }</h1>
            <b>Start Date: </b><span>{ focusedProject.assigned_on?.split('T')[0] + " " + focusedProject.assigned_on?.split('T')[1].split(':')[0] + ":" +  focusedProject.assigned_on?.split('T')[1].split(':')[1] }</span><br />
            <b>End Date: </b><span>{ focusedProject.deadline?.split('T')[0] + " " + focusedProject.deadline?.split('T')[1].split(':')[0] + ":" +  focusedProject.deadline?.split('T')[1].split(':')[1] }</span><br />
            <b>Client: </b><span>{  }</span><br />
            <b>Team Members: </b><span>{ focusedProject.assigned_to?.join(', ') }</span><br />
        </section>
      </section>
      <section className={`project-tasks ${tasks.length == 0 ? 'hidden' : ''}`}>
        <h1>Tasks</h1>
        <table>
            <thead>
                <tr>
                    <td>Task Name</td>
                    <td>Assigned Date</td>
                    <td>Status</td>
                    <td>Timer</td>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.map((task, index)=>{
                        return (
                            <tr key={index}>
                                <td>{ task.name }</td>
                                <td>{ task.created_at.split('T')[0] + " " + task.created_at.split('T')[1].split(':')[0] + ':' + task.created_at.split('T')[1].split(':')[1] }</td>
                                <td>{ task.flag }</td>
                                <td></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
      </section>
    </div>
  )
}

export default Developer
