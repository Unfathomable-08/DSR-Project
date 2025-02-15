import axios from 'axios';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';

const ChangePassword = () => {

    const token = localStorage.getItem('token');

    const { register, handleSubmit, setError, formState: {errors, isSubmitting} } = useForm();
    const [FormData, setFormData] = useState('');

    const navigate = useNavigate();

    const submitFn = (data) => {
        setFormData(data);
    }

    useEffect(()=>{
        const featchData = async () => {
            if (FormData !== ""){
                if (FormData.password == FormData.password2){
                    if (FormData.password1 !== FormData.password){
                        try {
                            const res = await axios.post('https://lms-dsr-project.vercel.app/userschange-password/', FormData, {
                              headers: {
                                'Authorization': `Bearer ${token})}`
                              }
                            });
                            if (res.status === 201){
                                navigate('/')
                            }
                        }
                        catch (error) {
                            alert('An error occured while sending data!')
                            console.error(error);
                        }
                    }
                    else {
                        setError('password', {
                            type: "manual", 
                            message: "New password can't be same as old one"
                          }
                        )
                    }
                }
                else {
                    setError('password2', {
                        type: "manual", 
                        message: "Confirm passowrd is not same as password entered"
                      }
                    )
                }
            }
        }
        featchData();
    },[FormData])

  return (
    <div className='login-page'>
      <div className="login-container">
        <form onSubmit={handleSubmit(submitFn)}>
          <h2 style={{paddingBottom: '20px'}}>Reset Password</h2>

            <input
              type="text"
              placeholder='Current Password'
              {...register('password1', {
                required: 'Password is required',
                minLength: {
                  value: 8, 
                  message: 'Password must be at least 8 characters long'
                },
                maxLength: {
                  value: 30, 
                  message: 'Password must be less than 30 characters'
                }
              })}
            />
            {errors.password && <p className='error'>{errors.password.message}</p>}
            <input
              type="text"
              placeholder='New Password'
              {...register('password', { 
                required: 'New Password is required', 
                minLength: {
                  value: 8, 
                  message: 'Password must be at least 8 characters long'
                },
                maxLength: {
                  value: 30, 
                  message: 'Password must be less than 30 characters'
                }
              })}
            />
            {errors.password1 && <p className='error'>{errors.password1.message}</p>}
            <input
              type="text"
              placeholder='Confirm Password'
              {...register('password2', { 
                required: 'Confirm Password is required', 
                minLength: {
                  value: 8, 
                  message: 'Password must be at least 8 characters long'
                },
                maxLength: {
                  value: 30, 
                  message: 'Password must be less than 30 characters'
                }
              })}
            />
            {errors.password2 && <p className='error'>{errors.password2.message}</p>}

            <Link to="/forgetPassword" className='forgetPs'>
              Forget Password?
            </Link>
            <input type="submit" value='Login' disabled={isSubmitting}/>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
