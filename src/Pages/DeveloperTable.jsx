import { useContext, useEffect, useState } from "react";
import "./Styles/DeveloperTable.css";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import './Styles/Developer.css';
import { PopUpOpened, UserPosition } from "../Context";
import AddDev from "../Components/AddDev";
import Details from "../Components/Details";

const DeveloperTable = () => {
  const location = useLocation();
  const [developers, setDevelopers] = useState([]);
  const [, setIsPopUpOpened] = useContext(PopUpOpened);
  const [showAddDev, setShowAddDev] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [focused, setFocused] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsPro, setDetailsPro] = useState(null);

  const [userPosition] = useContext(UserPosition);
  const navigate = useNavigate();

  // Fetch data
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const res = await axios.get("https://lms-dsr-project.vercel.app/usersleaddeveloper/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (location.pathname === '/developerDetails') {
          setDevelopers(res.data.developers);
        } else {
          setDevelopers(res.data.leads);
        }
      } catch (error) {
        console.log(error);
        if (error.status == 401){
          navigate('/login');
        }
      }
    };
    fetchData();
  }, [location.pathname]);

  const deleteDev = async (email) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://lms-dsr-project.vercel.app/usersleaddeveloper/`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { email },
      });
      setDevelopers(developers.filter((dev) => dev.email !== email));
    } catch (error) {
      console.log(error)
    }
  }

  const chnageActive = async (dev) => {
    try {
      const token = localStorage.getItem('token');

      await axios.patch(`https://lms-dsr-project.vercel.app/usersleaddeveloper/`, {
        is_active: !dev.is_active,
        email: dev.email
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="">
        <div className="">
          <div className="project-tasks">
            <div className="tasks-head">
              <h1 className="">
                {location.pathname === '/developerDetails' ? 'Developers' : 'Team Leads'}
              </h1>
              <button onClick={() => {
                setShowAddDev(true);
                setIsPopUpOpened
              }}>
                {location.pathname === '/developerDetails' ? 'Add Developers' : 'Add Team Leads'}
              </button>
            </div>

            <table>
              <thead>
                <tr className="">
                  <td>Name</td>
                  <td>Email</td>
                  <td>Role</td>
                  {userPosition == 'admin' && <td>Is Active</td>}
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {developers.map((dev, index) => (
                  <tr key={index} className="">
                    <td
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setIsPopUpOpened(true);
                        setDetailsPro(dev);
                        setShowDetails(true);
                      }}>{dev.name}</td>
                    <td>{dev.email}</td>
                    <td title={dev.details} onClick={() => {
                      setIsPopUpOpened(true);
                      setDetailsPro(dev);
                      setShowDetails(true);
                    }}>
                      {dev?.job?.split('-')?.join('')}
                    </td>

                    {userPosition == 'admin' && <td style={{ textAlign: 'center' }}>
                      <input type="checkbox" defaultChecked={dev.is_active} onChange={() => { chnageActive(dev) }} />
                    </td>}

                    <td>
                      <div className="action-btn">
                        <button onClick={() => {
                          setIsPopUpOpened(true);
                          setIsEditing(true);
                          setFocused(dev)
                        }}>
                          <i className="fa-solid fa-pen-to-square edit" style={{ color: 'green' }}></i>
                        </button>
                        <button onClick={() => {
                          deleteDev(dev.email);
                        }}>
                          <i className="fa-solid fa-trash trash" style={{ color: '#ee0000' }}></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showAddDev && <AddDev setState={setShowAddDev} action="add" />}
      {isEditing && <AddDev setState={setIsEditing} action="edit" edit={focused} />}

      {showDetails && <Details data={detailsPro} setState={setShowDetails} details="client" />}
    </>
  );
};

export default DeveloperTable;
