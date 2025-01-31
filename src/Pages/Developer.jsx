import React, { useEffect, useState } from 'react'
import './Styles/Developer.css'
import img from '../assets/avatar2.jpg'
import axios from 'axios';
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar';

const Developer = () => {
    const [data, setData] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [focusedProject, setFocusedProject] = useState({})
    const [timers, setTimers] = useState({});
    const [isRunning, setIsRunning] = useState(false);

    //fetching timer
    useEffect(()=>{
        //
    },[isRunning])


    //fetching projects
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const fetchData = async () => {
                try {
                    const res = await axios.get('http://127.0.0.1:8000/users/projects/', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setData(res.data.data)
                } catch (error) {
                    alert('An error occurred while sending data!')
                    console.error(error);
                }
            };
            fetchData();
        }
    }, []);
    
    //fetching tasks
    useEffect(() => {
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
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [focusedProject]);

    //timer functionality

    const toggleTimer = (taskId) => {
        setTimers((prev) => {
            const task = prev[taskId] || {};
            if (task.isRunning) {
                clearInterval(task.intervalId); // Stop the interval when stopping the timer
                setIsRunning(false);
                return { ...prev, [taskId]: { ...task, isRunning: false, intervalId: null } };
            } else {
                const intervalId = setInterval(() => {
                    setTimers((prevTimers) => {
                        const updatedTask = prevTimers[taskId];
                        if (updatedTask?.isRunning) {
                            return {
                                ...prevTimers,
                                [taskId]: { ...updatedTask, elapsed: updatedTask.elapsed + 1 }
                            };
                        }
                        setIsRunning(true);
                        return prevTimers;
                    });
                }, 1000); // Update every second
                
                return {
                    ...prev,
                    [taskId]: { isRunning: true, elapsed: task.elapsed || 0, intervalId }
                };
            }
        });
    };

    const getTimerDisplay = (taskId) => {
        const timer = timers[taskId];
        if (!timer) return formatTime(0); // Default to 00:00 if no timer exists
        return formatTime(timer.elapsed); // Display the time accumulated
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        return `${hours}:${minutes % 60 < 10 ? '0' : ''}${minutes % 60}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
    };

    return (
        <div>
            <Sidebar />
            <Navbar />
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
                    <i className='fa-solid fa-check' style={{ backgroundColor: '#001696', color: 'white', borderRadius: "50%", padding: '2px 3px', fontSize: '14px' }}></i>
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
                        data.map((data, index) => {
                            return (
                                <div key={index} onClick={() => setFocusedProject(data)}>
                                    {data.name}
                                </div>
                            )
                        })
                    }
                </section>
                <section className={`project-details ${focusedProject.name ? '' : 'hidden'}`}>
                    <h1>{focusedProject.name}</h1>
                    <b>Start Date: </b><span>{focusedProject.assigned_on?.split('T')[0] + " " + focusedProject.assigned_on?.split('T')[1].split(':')[0] + ":" + focusedProject.assigned_on?.split('T')[1].split(':')[1]}</span><br />
                    <b>End Date: </b><span>{focusedProject.deadline?.split('T')[0] + " " + focusedProject.deadline?.split('T')[1].split(':')[0] + ":" + focusedProject.deadline?.split('T')[1].split(':')[1]}</span><br />
                    <b>Client: </b><span>{ }</span><br />
                    <b>Team Members: </b><span>{focusedProject.assigned_to?.join(', ')}</span><br />
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
                            tasks.map((task, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{task.name}</td>
                                        <td>{task.created_at.split('T')[0] + " " + task.created_at.split('T')[1].split(':')[0] + ':' + task.created_at.split('T')[1].split(':')[1]}</td>
                                        <td>{task.flag}</td>
                                        <td>
                                            <div className="timer">
                                                <div>{getTimerDisplay(task.id)}</div>
                                                <button onClick={() => toggleTimer(task.id)}>
                                                    {timers[task.id]?.isRunning ? 'Stop' : 'Start'}
                                                </button>
                                            </div>
                                        </td>
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

export default Developer;