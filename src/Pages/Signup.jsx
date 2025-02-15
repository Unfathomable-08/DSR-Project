import React, { useState, useEffect } from 'react';
import './Styles/Login.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState('');
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

  const submitFn = (data) => {
    setFormData(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (formData !== "") {
        if (formData.password == formData.rePassword){
          try {
            const res = await axios.post('https://lms-dsr-project.vercel.app/usersregister/', formData);
            if (res.status === 201){
              localStorage.setItem("token", res.data.token.access);
              return navigate('/login');
            }
          } catch (error) {
            alert('An error occured while sending data!')
            console.log(error);
          }
        }
        else {
          setError('rePassword', {
              type: "manual", 
              message: "Confirm passowrd is not same as password entered"
            }
          )
        }
      }
    };
    fetchData();
  }, [formData]);

  return (
    <div className='login-page'>
      <div className="login-container">
        <form onSubmit={handleSubmit(submitFn)}>
          <h2>Signup Form</h2>
          <div className="toggler">
            <div className=""><Link className="link" to='/login'>Login</Link></div>
            <div className="active"><Link className="active-link" to='/signup'>Signup</Link></div>
          </div>
          
          <div className="name-input">
            <input
              type="text"
              placeholder='First Name'
              {...register('name', {
                required: 'Name is required'
              })}
              />
            <input
              type="text"
              placeholder='Last Name'
              {...register('lname', {
                required: 'Name is required'
              })}
              />
              {errors.fname && <p className='error'>{errors.fname.message}</p>}
              {errors.lname && <p className='error'>{errors.lname.message}</p>}
          </div>

          <input
            type="email"
            placeholder='Email Address'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && <p className='error'>{errors.email.message}</p>}

          <input
            type="text"
            placeholder='Password'
            {...register('password', { 
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
            placeholder='Confirm Password'
            {...register('rePassword', { 
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
          {errors.rePassword && <p className='error'>{errors.rePassword.message}</p>}

        
          <select name='role' className='selector'
            {...register('role', { required: 'Position is required' })}
          >
            <option value="">Select Position</option>
            <option value="admin">Admin</option>
            <option value="lead">Lead</option>
            <option value="developer">Developer</option>
          </select>
          {errors.role && <p className='error'>{errors.role.message}</p>}

          <select name='job' className='selector'
            {...register('job', { required: 'Role is required' })}
          >
            <option value="">Select Role</option>
            <option value="front-end">Frontend</option>
            <option value="back-end">Backend</option>
            <option value="qa">QA</option>
            <option value="none">None</option>
          </select>
          {errors.job && <p className='error'>{errors.job.message}</p>}

          <input type="submit" value='Signup' disabled={isSubmitting} />
        </form>
      </div>
    </div>
  );
}

export default Signup;
