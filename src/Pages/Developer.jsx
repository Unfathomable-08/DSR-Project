import React, { useContext, useEffect, useState } from 'react'
import './Styles/Developer.css'
import img from '../assets/avatar2.jpg'
import axios from 'axios';
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar';
import { PopUpOpened, UserEmail, UserName, UserPosition } from '../Context';
import AddTask from '../Components/AddTask';
import Details from '../Components/Details';
import { useNavigate } from 'react-router-dom';

const Developer = () => {
    const [, setUserEmail] = useContext(UserEmail);
    const [, setUserName] = useContext(UserName);
    const [, setUserPosition] = useContext(UserPosition);

    const [data, setData] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [focusedProject, setFocusedProject] = useState({})
    const [focusedTask, setFocusedTask] = useState({})
    const [timers, setTimers] = useState({});
    
    const [showAddTask, setShowAddTask] = useState(false);
    const [showEditTask, setShowEditTask] = useState(false);
    const [, setIsPopUpOpened] = useContext(PopUpOpened);

    const [showDetails, setShowDetails] = useState(false);
    const [detailsPro, setDetailsPro] = useState({});

    const navigate = useNavigate();

    //fetching timer
    const fetchTimimg = async(taskId) => {
        const timeTaken = tasks.filter((task) => task.id == taskId)[0].time_taken;
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`https://lms-dsr-project.vercel.app/api/task/?id=${taskId}`, {
                time_taken: timers[taskId].elapsed + timeTaken
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    //fetching projects
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const fetchData = async () => {
                try {
                    const res = await axios.get('https://lms-dsr-project.vercel.app/api/projects/', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setData(res.data.data)
                    setUserEmail(res.data.user_email);
                    setUserName(res.data.user_name);
                    setUserPosition(res.data.user_role);
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
                const res = await axios.get(`https://lms-dsr-project.vercel.app/api/task/?project=${focusedProject.name}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTasks(res.data.data);
            }
            catch (error) {
                console.log(error);
                navigate('/')
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
                fetchTimimg(taskId);
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
        const timeTaken = tasks.filter((task) => task.id == taskId)[0].time_taken;
        const timer = timers[taskId];
        if (!timer) return formatTime(timeTaken);
        return formatTime(timer.elapsed + timeTaken); // Display the time accumulated
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        return `${hours}:${minutes % 60 < 10 ? '0' : ''}${minutes % 60}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
    };

    //adding tasks

    const addTask = () => {
        window.scrollTo(0, 0);
        setShowAddTask(true);
        setIsPopUpOpened(true);
    }


    //delete tasks 

    const taskDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {     
            const res = await axios.delete(`https://lms-dsr-project.vercel.app/api/task/?id=${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    //edit tasks

    const taskEdit = (task) => {
        window.scrollTo(0, 0);
        setFocusedTask(task);
        setIsPopUpOpened(true);
        setShowEditTask(true);
    }

    return (
        <div>
            <Sidebar />
            <Navbar />
            <section className='project-header'>
                <img src={img} alt="" />
                <div>
                    <i className='fa-solid fa-list'></i>
                    <div>
                        <b>Pending Projects</b>
                        <p>{
                            data.filter(project => project.status == 'pending').length    
                        }</p>
                    </div>
                </div>
                <div>
                    <i className='fa-solid fa-check' style={{ backgroundColor: '#001696', color: 'white', borderRadius: "50%", padding: '2px 3px', fontSize: '14px' }}></i>
                    <div>
                        <b>Completed Projects</b>
                        <p>{
                            data.filter(project => project.status == 'completed').length    
                        }</p>
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
                                <div key={index} onClick={() => setFocusedProject(data)} className={data.status}>
                                    {data.name}
                                </div>
                            )
                        })
                    }
                </section>
                <section className={`project-details ${Object.keys(focusedProject).length === 0 ? 'hidden' : ''}`}>
                    <h1>{focusedProject.name}</h1>
                    <b>Start Date: </b><span>{focusedProject.assigned_on?.split('T')[0] + " " + focusedProject.assigned_on?.split('T')[1].split(':')[0] + ":" + focusedProject.assigned_on?.split('T')[1].split(':')[1]}</span><br />
                    <b>End Date: </b><span>{focusedProject.deadline?.split('T')[0] + " " + focusedProject.deadline?.split('T')[1].split(':')[0] + ":" + focusedProject.deadline?.split('T')[1].split(':')[1]}</span><br />
                    <b>Client: </b><span>{ focusedProject.client }</span><br />
                    <b>Team Members: </b><span>{focusedProject.assigned_to?.join(', ')}</span><br />
                </section>
            </section>
            <section className={`project-tasks ${Object.keys(focusedProject).length === 0 ? 'hidden' : ''}`}>
                <div className="tasks-head">
                    <h1>Tasks</h1>
                    <button onClick={addTask}>Add Task</button>
                </div>
                <table className={`${tasks.length == 0 ? 'hidden' : ''}`}>
                    <thead>
                        <tr>
                            <td>Task Name</td>
                            <td>Assigned Date</td>
                            <td>Status</td>
                            <td>Timer</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task, index) => {
                                return (
                                    <tr key={index}>
                                        <td onClick={() => {
                                        setShowDetails(true);
                                        setIsPopUpOpened(true);
                                        setDetailsPro(task);
                                        window.scrollTo(0, 0);
                                    }}>{task.name}</td>
                                        <td>{task.created_at.split('T')[0] + " " + task.created_at.split('T')[1].split(':')[0] + ':' + task.created_at.split('T')[1].split(':')[1]}</td>
                                        {task.flag == 'yellow' && <td>Pending</td>}
                                        {task.flag == 'red' && <td>In Progress</td>}
                                        {task.flag == 'green' && <td>Completed</td>}
                                        <td>
                                            <div className="timer">
                                                <div>{getTimerDisplay(task.id)}</div>
                                                <button onClick={() => toggleTimer(task.id)}>
                                                    {timers[task.id]?.isRunning ? <i className='fa-solid fa-pause'></i> : <i className='fa-solid fa-play'></i>}
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='action-btn'>
                                                <button onClick={()=>taskEdit(task)}><i className='fa-solid fa-pen-to-square' style={{color: 'green'}}></i></button>
                                                <button onClick={()=>taskDelete(task.id)}><i className='fa-solid fa-trash' style={{color: '#ee0000'}}></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </section>
            {showAddTask && <AddTask setState={setShowAddTask} project={focusedProject.name} closeFocused={setFocusedProject} action="add"/>}
            {showEditTask && <AddTask setState={setShowEditTask} project={focusedProject.name} closeFocused={setFocusedProject} action="edit" edit={focusedTask}/>}

            {showDetails && <Details data={detailsPro} setState={setShowDetails} details="task"/>}
        </div>
    )
}

export default Developer;