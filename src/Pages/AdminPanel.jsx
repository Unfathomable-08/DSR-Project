import './Styles/AdminPanel.css';
import Navbar from '../Components/Navbar';
import { Bar, ChartLine } from '../Components/Chart';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { UserEmail, UserName, UserPosition } from '../Context';

const AdminPanel = () => {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();

  const [, setUserName] = useContext(UserName);
  const [, setUserEmail] = useContext(UserEmail);
  const [, setUserPosition] = useContext(UserPosition);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('https://lms-dsr-project.vercel.app/usersall/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setdata(res.data);
      } catch (error) {
        console.log(error);
        if (error.status == 401){
          navigate('/login');
        }
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchData = async () => {
        try {
          const res = await axios.get('https://lms-dsr-project.vercel.app/usersprojects/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setUserEmail(res.data.user_email);
          setUserName(res.data.user_name);
          setUserPosition(res.data.user_role);
        } catch (error) {
          alert('An error occurred while sending data!')
          console.error(error);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="admin-cont">
        <div className="bar admin">
          <div className="chart">
            <Bar />
          </div>
        </div>
        <div className="chart admin">
          <div className="chart">
            <ChartLine />
          </div>
        </div>
      </div>
      <div className="bottomBoxes">
        <div className="squareBox">
          <b>Total Dev</b>
          <b>{data.total_developers}</b>
        </div>
        <div className="squareBox">
          <b>Total Team Lead</b>
          <b>{data.total_leads}</b>
        </div>
        <div className="squareBox">
          <b>Total Client</b>
          <b>{data.total_clients}</b>
        </div>
        <div className="squareBox">
          <b>Total Projects</b>
          <b>{data.total_projects}</b>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
