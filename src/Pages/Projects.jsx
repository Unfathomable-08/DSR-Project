import { useContext, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Navbar from "../Components/Navbar";
import "./Styles/Projects.css";
import axios from "axios";
import { UserEmail, UserName, UserPosition } from "../Context";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";

const Projects = () => {
    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState('');
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm();
    const { fields, append, remove } = useFieldArray({ control, name: "assigned_to" });

    const [userEmail, setUserEmail] = useContext(UserEmail);
    const [, setUserName] = useContext(UserName);
    const [userPosition, setUserPosition] = useContext(UserPosition)
    
    const navigate = useNavigate();

    const onSubmit = (data) => {
        setFormData(data);
        reset();
        setShowForm(false);
    };

    // Fetch projects and tasks for each project
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
                    console.log(res.data)
                    setUserEmail(res.data.user_email)
                    setUserName(res.data.user_name)
                    setUserPosition(res.data.user_role)
                    setData(res.data.data);

                    // Fetch tasks for each project
                    const tasksData = [];
                    for (let project of res.data.data) {
                        const tasksRes = await axios.get(`http://127.0.0.1:8000/users/task/?project=${project.name}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        tasksData.push({ projectName: project.name, tasks: tasksRes.data.data });
                    }
                    setTasks(tasksData);
                } catch (error) {
                    alert('An error occurred while sending data!');
                    console.error(error);
                    navigate('/login')
                }
            };
            fetchData();
            console.log(userEmail)
            console.log(userPosition)
        }
    }, []);

    //adding projects

    useEffect(() => {
        if (formData !== "") {
            console.log(formData)
            const token = localStorage.getItem('token');
            const fetchData = async () => {
                try {
                    console.log(formData)
                    const res = await axios.post('http://127.0.0.1:8000/users/projects/', data, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console.log(res)
                    if (res.status == 201) {
                        //
                    }
                } catch (error) {
                    console.log(error);
                    alert("An error occurred while submitting data");
                }
            };
            fetchData();
        }
    }, [formData]);

    return (
        <>
            <Sidebar />
            <Navbar />
            <div>
                <section className="project-section-container">
                    <h1>Projects</h1>
                    <button className="project-add-button" onClick={() => setShowForm(!showForm)}>
                        {showForm ? "Cancel" : "Add Project"}
                    </button>
                </section>

                {showForm && (
                    <section className="project-form-toggle">
                        <div className="project-form-container">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="project-form-grid">
                                    <div className="project-input-group">
                                        <input
                                            type="hidden"
                                            value={userEmail}
                                            {...register('assigned_by', { required: true })}  
                                        />
                                        <input
                                            type="text"
                                            placeholder='Project Name'
                                            {...register('name', { required: "Project Name is required" })}
                                        />
                                        {errors.name && <span className='input-error-message'>{errors.name.message}</span>}
                                        <input
                                            type="text"
                                            placeholder='Client Email'
                                            {...register('client', { required: "Client Email is required" })}
                                        />
                                        {errors.client && <span className='input-error-message'>{errors.client.message}</span>}
                                        <input
                                            type="datetime-local"
                                            placeholder='Deadline'
                                            {...register('deadline', { required: "Deadline is required" })}
                                        />
                                        {errors.deadline && <span className='input-error-message'>{errors.deadline.message}</span>}

                                        <textarea
                                            placeholder='Enter Description ...'
                                            {...register('description', { required: "Description is required" })}
                                        />
                                        {errors.description && <span className='input-error-message'>{errors.description.message}</span>}
                                    </div>

                                    <div className='assigned-members-container'>
                                        <h1>Assigned To:</h1>
                                        <div>
                                            {fields.map((item, index) => (
                                                <div key={item.id} className="assigned-member-row">
                                                    <input
                                                        {...register(`assigned_to[${index}].name`)}
                                                        type="text"
                                                        placeholder="Assigned Name"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="assigned-remove-button"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => append({ name: "" })}
                                            className='assigned-add-button'
                                        >
                                            Add More
                                        </button>
                                    </div>
                                </div>
                                <div className="project-submit-container">
                                    <button type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </section>
                )}
            </div>
            <section className="existing-projects-container">
                <h1>Existing Projects</h1>
                {data.map((project, index) => {
                    // Find tasks for the current project using project name
                    const projectTasks = tasks.find(task => task.projectName === project.name)?.tasks || [];
                    return (
                        <div key={index} className="project-card">
                            <h2>{project.name}</h2>
                            <p className="project-status">Status: <span>{project.status}</span></p>

                            {projectTasks.map((task, taskIndex) => (
                                <div key={taskIndex} className="project-task">
                                    <b>{task.name}</b>
                                    <p>Assigned Date: {task.created_at?.split('T')[0] + " " + task.created_at?.split('T')[1].split(':')[0] + ":" + task.created_at?.split('T')[1].split(':')[1]}</p>
                                    <p>Status: <span>{task.status}</span></p>
                                    <p>Timer: {task.timer || "Not started"}</p>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </section>
        </>
    );
};

export default Projects;
