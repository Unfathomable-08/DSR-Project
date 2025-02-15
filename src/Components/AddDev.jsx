import { useContext, useEffect, useState } from 'react'
import '../Pages/Styles/AddTask.css'
import { useForm } from 'react-hook-form'
import { PopUpOpened, UserEmail } from '../Context'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const AddDev = (props) => {

    const location = useLocation();

    const [formData, setFormData] = useState('');

    const [, setIsPopUpOpened] = useContext(PopUpOpened);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const taskSubmitFn = (data) => {
        setFormData(data);
    }

    useEffect(() => {
        if (formData !== "") {
            const token = localStorage.getItem('token')
            const fetchData = async () => {
                try {
                    if (props.action == "add") {
                        const res = await axios.post('https://lms-dsr-project.vercel.app/users/leaddeveloper/', formData, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        if (res.status == 201) {
                            setIsPopUpOpened(false);
                            props.setState(false);
                            window.location.reload();
                        }
                    }
                    else {
                        const res = await axios.patch(`https://lms-dsr-project.vercel.app/users/leaddeveloper/`, formData, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        if (res.status == 200) {
                            setIsPopUpOpened(false);
                            props.setState(false);
                            window.location.reload();
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
    }, [formData])

    return (
        <div className='add-task'>
            <form onSubmit={handleSubmit(taskSubmitFn)}>
                {
                    location.pathname == '/developerDetails' ?
                        <h2>{props.action == "add" ? 'Add Developer' : "Edit Developer"}</h2> :
                        <h2>{props.action == "add" ? 'Add Team Lead' : "Edit Team Lead"}</h2>
                }
                <button onClick={() => { props.setState(false); setIsPopUpOpened(false) }} className='cross'>
                    <i className="fa-solid fa-xmark"></i>
                </button>

                <input
                    type="text"
                    placeholder='Fullname'
                    defaultValue={props.action == "edit" ? props.edit.name : ''}
                    {...register('name', {
                        required: "Name is required"
                    })}
                />
                {errors.name && <p className='error'>{errors.name.message}</p>}
                <input
                    type="email"
                    placeholder='Email'
                    defaultValue={props.action == "edit" ? props.edit.email : ''}
                    {...register('email', {
                        required: "Email is required"
                    })}
                />
                {errors.email && <p className='error'>{errors.email.message}</p>}

                {
                    props.action == 'add' &&
                    <>
                        <input
                            type="password"
                            placeholder='Password'
                            defaultValue={props.action == "edit" ? props.edit.email : ''}
                            {...register('password', {
                                required: "Password is required"
                            })}
                        />
                        {errors.email && <p className='error'>{errors.email.message}</p>}
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            defaultValue={props.action == "edit" ? props.edit.email : ''}
                            {...register('password2', {
                                required: "Confirmation is required"
                            })}
                        />
                        {errors.email && <p className='error'>{errors.email.message}</p>}
                    </>
                }
                {
                    location.pathname == '/developerDetails' ?
                    <>
                        <select
                            className='status-select'
                            {...register('job', {
                                required: "Role is required"
                            })}
                            >
                            <option value="">Select Role</option>
                            <option value="front-end">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="qa">QA</option>
                        </select>
                        {errors.job && <p className='error'>{errors.job.message}</p>}
                    </>
                    :
                    <input
                            hidden
                            value='none'
                            {
                                ...register('job')
                            }
                    />
                }
                <input
                    type="text"
                    value={location.pathname == '/developerDetails' ? 'developer' : 'lead'}
                    hidden
                    {...register('role')}
                    />

                {   location.pathname == '/developerDetails' ?
                        <input type="submit" value={props.action == "add" ? 'Add Developer' : "Edit Developer"} disabled={isSubmitting} />
                        :
                        <input type="submit" value={props.action == "add" ? 'Add Lead' : "Edit Lead"} disabled={isSubmitting} />
                }
            </form>
        </div>
    )
}

export default AddDev
