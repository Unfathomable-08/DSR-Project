import React from 'react'
import './Styles/Projects.css'
import img from '../assets/avatar2.jpg'

const Projects = () => {
  return (
    <div>
      <section className='project-header'>
        <img src={img} alt="" />
        <div>
            <i className='fa-solid fa-list'></i>
            <div>
                <b>Pending Task</b>
                <p>0</p>
            </div>
        </div>
        <div>
            <i className='fa-solid fa-check' style={{backgroundColor: '#001696', color: 'white', borderRadius: "50%", padding: '2px 3px', fontSize: '14px'}}></i>
            <div>
                <b>Completed Task</b>
                <p>0</p>
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
      <section className='projects-names'>
        <h1>
            Projects
        </h1>
        <div>
            Project Alpha
        </div>
        <div>
            Project Beta
        </div>
      </section>
      <section className='project-details'>
        <h1>Project Alpha</h1>
        <b>Start Date</b><br />
        <b>End Date</b><br />
        <b>Client</b><br />
        <b>Team Members</b><br />
      </section>
      <section className='tasks'>
        <h1>Tasks</h1>
        <table>
            <thead>
                <td>Task Name</td>
                <td>Assigned Date</td>
                <td>Status</td>
            </thead>
            <tbody>
                <tr>
                    <td>Task 1</td>
                    <td>date 1</td>
                    <td>In progress</td>
                </tr>
                <tr>
                    <td>Task 2</td>
                    <td>date 2</td>
                    <td>In pending</td>
                </tr>
            </tbody>
        </table>
      </section>
    </div>
  )
}

export default Projects
