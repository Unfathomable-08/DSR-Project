import { useContext, useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useForm, useFieldArray } from 'react-hook-form';
import './Styles/Lead.css';
import axios from 'axios';
import { UserEmail } from '../Context';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

const Lead = () => {
    const navigate = useNavigate();

    const [userEmail] = useContext(UserEmail)

    const [data, setData] = useState("");

    const { control, handleSubmit, register, formState: { errors } } = useForm();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "assigned_to"
    });

    const onSubmit = (formData) => {
        const finalData = {
            ...formData,
            assigned_to: formData.assigned_to.map(item => item.name)
        };

        setData(finalData);
    };

    useEffect(() => {
        if (data !== "") {
            const token = localStorage.getItem('token');
            const fetchData = async () => {
                try {
                    const res = await axios.post('https://lms-dsr-project.vercel.app/api/projects/', data, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (res.status == 201){
                        navigate('/')
                    }
                } catch (error) {
                    console.log(error);
                    alert("An error occurred while submitting data");
                }
            };
            fetchData();
        }
    }, [data]);

    return (
        <>
            <Sidebar/>
            <Navbar />
            <div className='add-project-cont'>
                <div className="add-project">
                    <h1>Add Project</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form">
                            <div className="input1">
                                <input
                                    type="text" 
                                    value={userEmail}
                                    hidden
                                    {...register('assigned_by')}
                                />
                                <input
                                    type="text"
                                    placeholder='Project Name'
                                    {...register('name', { required: "Project Name is required" })}
                                />
                                {errors.name && <span className='error'>{errors.name.message}</span>}

                                <input
                                    type="datetime-local"
                                    placeholder='Deadline'
                                    {...register('deadline', { required: "Deadline is required" })}
                                />
                                {errors.deadline && <span className='error'>{errors.deadline.message}</span>}

                                <textarea
                                    placeholder='Enter Description ...'
                                    {...register('description', { required: "Description is required" })}
                                />
                                {errors.description && <span className='error'>{errors.description.message}</span>}
                            </div>

                            <div className='input2'>
                                <h3>Assigned To:</h3>
                                <div>
                                    {fields.map((item, index) => (
                                        <div key={item.id} className="assigned-input">
                                            <input
                                                {...register(`assigned_to[${index}].name`)}
                                                type="text"
                                                placeholder="Assigned Name"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="remove-assigned"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => append({ name: "" })}
                                    className='add-more-assigned'
                                >
                                    Add More
                                </button>
                            </div>
                        </div>
                        <div className="btn-div-lead">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Lead;
