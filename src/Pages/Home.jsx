import React, { useContext, useEffect, useRef, useState } from 'react'
import './Styles/Home.css'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import AddTask from '../Components/AddTask'
import { PopUpOpened, UserName, UserPosition, UserEmail } from '../Context'
import ViewTask from '../Components/ViewTask'

const Home = () => {
  //featch url
  const [fetchURL, setFetchURL] = useState('http://127.0.0.1:8000/users/projects/')

  const [showTaskForm, setShowTaskForm] = useState(false); // for add task
  const [taskFormProject, setTaskFormProject] = useState(null); // for passing project name to add task
  const [showTaskPage, setShowTaskPage] = useState(false); // for view task

  const [data, setData] = useState([]); // to store data from fetch
  const [filteredData, setFilteredData] = useState([]); // to store filtered data

  const navigate = useNavigate(); //navigate 

  const [, setIsPopUpOpened] = useContext(PopUpOpened);
  const [, setUserName] = useContext(UserName);
  const [, setUserPosition] = useContext(UserPosition);
  const [, setUserEmail] = useContext(UserEmail);

  //search functionality

  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');

  // const searchFn = () => {
  //   if (searchRef.current.value !== ""){
  //     setFetchURL(`http://127.0.0.1:8000/users/projects/?search=${searchRef.current.value}`)
  //   }
  //   else {
  //     setFetchURL('http://127.0.0.1:8000/users/projects/');
  //   }
  // }

  //featching

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token){
      const fetchData = async () => {
        try {
          const res = await axios.get(fetchURL, {
            headers: {
              'Authorization': `Bearer ${token})}`
            }
          });
          setUserName(res.data.user_name)
          setUserPosition(res.data.user_role)
          setUserEmail(res.data.user_email)
          setData(res.data.data)
        } catch (error) {
          alert('An error occured while sending data!')
          console.error(error);
          navigate('/login')
        }
      };
      fetchData();
    }
    else navigate('/login')
  },[fetchURL]);

  //filtering on search 

  useEffect(()=>{
    setFilteredData('')
    if (searchValue !== "") {
      const filtered = data.filter((project) =>
        project.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  },[searchValue])

  // onclick function on add task
  
  const addtask = (name) => {
    window.scrollTo(0, 0);
    setShowTaskForm(true);
    setTaskFormProject(name);
    setIsPopUpOpened(true);
  }
  
  // onclick function on view task
  
  const taskPage = (name) => {
    window.scrollTo(0, 0);
    setShowTaskPage(true);
    setIsPopUpOpened(true);
    setTaskFormProject(name)
  }

  //deadline flags

  const date = new Date().toISOString();
  
  return (
    <>
    <Navbar/>
    <div>
            <h1 className='project-heading'>Projects</h1>

            {/* search bar */}

          <div className="project-grid">
            <div className="project">
                <input onChange={(e)=>{setSearchValue(e.target.value)}} className='search-pro' type="search" name="" id="" ref={searchRef}/>
            </div>
            <div className="project-btn">
                {/* <button onClick={searchFn}>Search Projects</button> */}
                <button>Search Projects</button>
            </div>
          </div>
      {
        filteredData.length == 0 ? 
        data.map((data, index)=>{
          return (
            <div key={index}>
              <div className="project-grid">
                <div className="project">
                    <h3>{ data.name }</h3>
                    <b>Assigned By: <span>{ data.assigned_by }</span></b><br />
                    <b>Assigned On: <span>{ data.assigned_on.split('T')[0] + " " + data.assigned_on.split('T')[1].split(':')[0] + ':' + data.assigned_on.split('T')[1].split(':')[1] }</span></b><br />
                    <b>Deadlind: <span className={date > data.deadline ? 'deadline-passed' : 'deadline'}>{ data.deadline.split('T')[0] + " " + data.deadline.split('T')[1].split(':')[0] + ':' + data.deadline.split('T')[1].split(':')[1] }</span></b>
                    <p>
                      {data.description.split(" ").slice(0, 20).join(" ")}
                      {data.description.split(" ").length > 20 && <b className='dots'> ...</b>}
                    </p>
                </div>
                <div className="project-btn">
                    <button onClick={()=>addtask(data.name)}>Add Task</button>
                    <button onClick={()=>taskPage(data.name)}>View Task</button>
                </div>
              </div>
            </div>
          )
        })
        :
        filteredData.map((data, index)=>{
          return (
            <div key={index}>
              <div className="project-grid">
                <div className="project">
                    <h3>{ data.name }</h3>
                    <b>Assigned By: <span>{ data.assigned_by }</span></b><br />
                    <b>Assigned On: <span>{ data.assigned_on.split('T')[0] + " " + data.assigned_on.split('T')[1].split(':')[0] + ':' + data.assigned_on.split('T')[1].split(':')[1] }</span></b><br />
                    <b>Deadlind: <span className={date > data.deadline ? 'deadline-passed' : 'deadline'}>{ data.deadline.split('T')[0] + " " + data.deadline.split('T')[1].split(':')[0] + ':' + data.deadline.split('T')[1].split(':')[1] }</span></b>
                    <p>
                      {data.description.split(" ").slice(0, 20).join(" ")}
                      {data.description.split(" ").length > 20 && <b className='dots'> ...</b>}
                    </p>
                </div>
                <div className="project-btn">
                    <button onClick={()=>addtask(data.name)}>Add Task</button>
                    <button onClick={()=>taskPage(data.name)}>View Task</button>
                </div>
              </div>
            </div>
          )
        })
        
      }

      {/* add task form pop up */}

      {showTaskForm && <AddTask setState={setShowTaskForm} project={taskFormProject}  action="add"/>}

      {/* view task page pop up */}

      {showTaskPage && <ViewTask setState={setShowTaskPage} project={taskFormProject}/>}

    </div>
    </>
  )
}

export default Home