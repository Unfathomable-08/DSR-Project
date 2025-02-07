import { useContext, useEffect, useState } from 'react'
import '../Pages/Styles/AddTask.css'
import { useForm } from 'react-hook-form'
import { PopUpOpened, UserEmail } from '../Context'
import axios from 'axios'

const AddUser = (props) => {

    const [userEmail] = useContext(UserEmail);

    const [formData, setFormData] = useState('');

    const [, setIsPopUpOpened] = useContext(PopUpOpened);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const taskSubmitFn = (data) => {
        setFormData(data);
    }

    useEffect(() => {
        const addClient = async () => {
            const token = localStorage.getItem("token");

            if (props.action == 'add') {
                try {
                    const res = await axios.post(
                        "http://127.0.0.1:8000/users/client/",
                        formData,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    if (res.status == 201) {
                        props.setState(false);
                        setIsPopUpOpened(false);
                        window.location.reload();
                    }
                    console.log(res.data);
                } catch (error) {
                    console.log("Error adding developer:", error);
                }
            }
            else {
                try {
                    console.log(formData)
                    const res = await axios.patch(
                        `http://127.0.0.1:8000/users/client/`,
                        formData,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    if (res.status == 200) {
                        props.setState(false);
                        setIsPopUpOpened(false);
                        window.location.reload();
                    }
                } catch (error) {
                    console.log("Update error:", error);
                }
            }
        }

        addClient();

    }, [formData])

    return (
        <div className='add-task'>
            <form onSubmit={handleSubmit(taskSubmitFn)}>
                <h2>{props.action == "add" ? 'Add Client' : 'Edit Client'}</h2>
                <button onClick={() => { props.setState(false); setIsPopUpOpened(false) }} className='cross'>
                    <i className="fa-solid fa-xmark"></i>
                </button>

                <input
                    type="text"
                    placeholder='Full Name'
                    defaultValue={props.action == "edit" ? props.edit.name : ''}
                    {...register('name', {
                        required: "Name is required"
                    })}
                />
                {errors.name && <p className='error'>{errors.name.message}</p>}
                <input
                    type="email"
                    placeholder='Email'
                    defaultValue={props.action === "edit" ? props.edit.email : ''}
                    {...register('email', {
                        required: "Email is required"
                    })}
                />
                {errors.time_to_complete && <p className='error'>{errors.time_to_complete.message}</p>}
                <input
                    type="text"
                    placeholder='Description'
                    defaultValue={props.action == "edit" ? props.edit.details : ''}
                    {...register('details', {
                        required: "Description is required"
                    })}
                />
                {errors.details && <p className='error'>{errors.details.message}</p>}

                <input type="submit" value={props.action == "add" ? 'Add Client' : "Edit Client"} disabled={isSubmitting} />
            </form>
        </div>
    )
}

export default AddUser
