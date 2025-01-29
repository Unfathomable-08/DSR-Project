import React, { useRef, useState } from 'react'
import '../Pages/Styles/Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserName, UserPosition } from '../Context';

const Navbar = () => {

  const navigate = useNavigate();

  const [userName] = useContext(UserName);
  const [userPosition] = useContext(UserPosition);

  const profileOptionRef = useRef(null);

  const toggleProfile = () => {
    profileOptionRef.current.classList.toggle("hidden");
  };  

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }

  return (
    <div className='navbar'>
      <h1>LMS Portal</h1>
      <nav>
        <button onClick={logout} className='signout'>Logout</button>
        <button onClick={toggleProfile} className='profile'><i className="fa-solid fa-user"></i></button>
      </nav>
      <div ref={profileOptionRef} className="profile-options hidden">
        <div className="project-head">
          <h3>{ userName }</h3>

        </div>
        <p className="profile-position">{ userPosition }</p>
        <ul>
          <li>
            <p>Manage Accounts</p><i className="fa-solid fa-user"></i>
          </li>
          {userPosition == "lead" &&
            <li>
              <p><Link to="/lead/addproject" className='link-profile'>Add Projects</Link></p><i className="fa-solid fa-bars-progress"></i>
            </li>
          }
          <li>
            <p><Link to='/resetPassword' className='link-profile'>Reset Password</Link></p><i className="fa-solid fa-lock"></i>
          </li>
          <li>
            <p><button className='logout-panel-btn' onClick={logout}>Logout</button></p><i style={{paddingRight: '2px'}} className="fa-solid fa-right-from-bracket"></i>
          </li>
          <li>
            <p>Delete Account</p><i style={{color: '#ff4422'}} className="fa-solid fa-trash"></i>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
