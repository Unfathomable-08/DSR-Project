import { useContext, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Navbar from "../Components/Navbar";
import "./Styles/Projects.css";
import axios from "axios";
import { PopUpOpened, UserEmail, UserName, UserPosition } from "../Context";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import Details from "../Components/Details";

const Projects = () => {
    const [showForm, setShowForm] = useState(false);
    const [focused, setFocused] = useState({});
    const [addOrEdit, setAddOrEdit] = useState('add');
    const [data, setData] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState('');
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm();
    const { fields, append, remove } = useFieldArray({ control, name: "assigned_to" }); 

    const [userEmail, setUserEmail] = useContext(UserEmail);
    const [, setUserName] = useContext(UserName);
    const [, setUserPosition] = useContext(UserPosition);

    const [showDetails, setShowDetails] = useState(false);
    const [, setIsPopUpOpened] = useContext(PopUpOpened);

    const navigate = useNavigate();

    const onSubmit = (data) => {
        setFormData(data);
        reset();
        setShowForm(false);
    };

    //get projects

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
                    setUserEmail(res.data.user_email);
                    setUserName(res.data.user_name);
                    setUserPosition(res.data.user_role);
                    setData(res.data.data);

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
                    console.log(error)
                    alert('An error occurred while sending data!');
                    navigate('/login');
                }
            };
            fetchData();
        }
    }, []);

    //add projects

    useEffect(() => {
        if(addOrEdit == 'add'){
            if (formData !== "") {
                const token = localStorage.getItem('token');
                const fetchData = async () => {
                    try {
                        console.log(formData)
                        const res = await axios.post('http://127.0.0.1:8000/users/projects/', formData, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        if (res.status === 201) {
                            setData(prev => [...prev, formData])
                        }
                    } catch (error) {
                        console.log(error);
                        alert("An error occurred while submitting data");
                    }
                };
                fetchData();
            }
        }
        else {
            if (formData !== "") {
                const token = localStorage.getItem('token');
                const fetchData = async () => {
                    console.log(formData)
                    try {
                        const res = await axios.patch('http://127.0.0.1:8000/users/projects/', formData, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        if (res.status === 201) {
                            setData(prev => [...prev, formData])
                        }
                    } catch (error) {
                        console.log(error);
                        alert("An error occurred while submitting data");
                    }
                };
                fetchData();
                setFocused({});
            }

        }
    }, [formData]);

    //delete projects

    const deleteProject = async (project) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.delete('http://127.0.0.1:8000/users/projects/', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    name: project.name
                }
            });
            if (res.status === 204){
                setData(prev => prev.filter(data => data.name !== project.name));
            }
        } catch (error) {
            console.log(error)
        }
    }

    //edit project

    const editProject = (project) => {
        reset();
        setFocused(project);
        setShowForm(true);
        setAddOrEdit('edit')
    }

    return (
        <>
            <Sidebar />
            <Navbar />
            <div>
                <section className="project-section-container">
                    <h1>Projects</h1>
                    <button
                        className="project-add-button"
                        onClick={() => {
                            setFocused({});
                            setShowForm(!showForm);
                            reset();
                            setAddOrEdit('add');
                        }}
                    >
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
                                            defaultValue={focused?.name || ''}
                                            {...register('name', { required: "Project Name is required" })}
                                        />
                                        {errors.name && <span className='input-error-message'>{errors.name.message}</span>}
                                        <input
                                            type="text"
                                            placeholder='Client Email'
                                            defaultValue={focused?.client || ''}
                                            {...register('client', { required: "Client Email is required" })}
                                        />
                                        {errors.client && <span className='input-error-message'>{errors.client.message}</span>}
                                        <input
                                            type="datetime-local"
                                            placeholder='Deadline'
                                            defaultValue={focused?.deadline && focused.deadline.slice(0, 16) || ''}
                                            {...register('deadline', { required: "Deadline is required" })}
                                        />
                                        {errors.deadline && <span className='input-error-message'>{errors.deadline.message}</span>}
                                        <textarea
                                            placeholder='Enter Description ...'
                                            defaultValue={focused?.description || ''}
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
                                                        {...register(`assigned_to[${index}]`)}
                                                        type="text"
                                                        placeholder="Assigned Name"
                                                        defaultValue={focused?.assigned_to && focused?.assigned_to[index] || ''}
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
                                            onClick={() => append()} // Appending an empty object for each new member
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
                    const projectTasks = tasks.find(task => task.projectName === project.name)?.tasks || [];
                    return (
                        <div key={index} className="project-card">
                            <div className="btns">
                                <h2>{project.name}</h2>
                                <div>
                                    <button onClick={() => editProject(project)}><i className="fa-solid fa-pen-to-square" style={{color: 'green'}}></i></button>
                                    <button onClick={() => deleteProject(project)}><i className="fa-solid fa-trash" style={{color: '#dd0000'}}></i></button>
                                </div>
                            </div>
                            <p className="project-status">Status: <span>{project.status}</span></p>
                            <p>
                                {project.description.split(" ").slice(0, 20).join(" ")}
                                {project.description.split(" ").length > 20 && <i
                                style={{color: '#001696', marginLeft: '10px', cursor: 'pointer'}}
                                onClick={() => {
                                    setShowDetails(true);
                                    setIsPopUpOpened(true);
                                    window.scrollTo(0, 0)
                                }}
                            >Read more ...</i>}
                            </p>

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
            {showDetails && <Details data={data[0]} setState={setShowDetails}/>}
        </>
    );
};

export default Projects;
