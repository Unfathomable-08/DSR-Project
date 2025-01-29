import React, { useState, useEffect } from 'react';
import './Styles/Login.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  const [emailFormData, setEmailFormData] = useState('');
  // const [otpFormData, setOtpFormData] = useState('');
  // const [step, setStep] = useState(1);

  const { register: emailRegister, handleSubmit: emailHandleSubmit, reset:emailReset, formState: { errors:emailErrors, isSubmitting:emailIsSubmitting } } = useForm();
  // const { register: otpRegister, handleSubmit: otpHandleSubmit, reset: otpReset, formState: { errors:otpErrors, isSubmitting:otpIsSubmitting } } = useForm();

  const emailSubmitFn = (data) => {
    setEmailFormData(data);
    // setStep(2);
    emailReset();
    // otpReset();
};

  //   const otpSubmitFn = (data) => {
  //     setOtpFormData(data);
  //     emailReset();
  //     otpReset();
  // };

  useEffect(() => {
    const fetchData = async () => {
      if (emailFormData !== "") {
        try {
          const res = await axios.post('http://127.0.0.1:8000/users/reset-password/', emailFormData);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [emailFormData]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (otpFormData !== "") {
  //       try {
  //         const res = await axios.post('http://127.0.0.1:8000/users/otp/', otpFormData);
  //         console.log(res);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   };
  //   fetchData();
  // }, [otpFormData]);


  return (
    <div className='login-page'>
      <div className="login-container">
        {/* {step === 1 ? ( */}
          <form onSubmit={emailHandleSubmit(emailSubmitFn)}>
            <h2>Reset Password</h2>
            <label htmlFor="email">Enter your email below to receive a confirmation message.</label>
            <input
              id='email'
              type="email"
              placeholder='Email Address'
              name='email'
              {...emailRegister('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {emailErrors.email && <p className='error'>{emailErrors.email.message}</p>}
            <input type="submit" value='Send Email' disabled={emailIsSubmitting} />
          </form>
        {/* ) : ( */}
          {/* <form onSubmit={otpHandleSubmit(otpSubmitFn)}>
            <h2>Enter OTP</h2>
            <label htmlFor="otp">Enter the OTP sent to your email.</label>
            <input
              id='otp'
              type="text"
              placeholder='OTP'
              name='otp'
              {...otpRegister('otp', { 
                required: 'OTP is required', 
                minLength: {
                  value: 6, 
                  message: 'OTP must be 6 charcters'
                },
                maxLength: {
                  value: 6, 
                  message: 'OTP must be 6 charcters'
                }})}
            />
            {otpErrors.otp && <p className='error'>{otpErrors.otp.message}</p>}
            <input type="submit" value='Submit OTP' disabled={otpIsSubmitting} />
          </form>
        )} */}
            <Link to="/login" className='forgetPs'>
              Remembered Your Password?
            </Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
