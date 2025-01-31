import './Styles/AdminPanel.css';
import Navbar from '../Components/Navbar';
import { Bar, ChartLine } from '../Components/Chart';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://127.0.0.1:8000/users/all/', {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        })
        setdata(res.data);
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    }
    fetchData();
  },[]);

  return (
    <div>
      <Sidebar/>
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
            <b>{ data.total_developers }</b>
        </div>
        <div className="squareBox">
            <b>Total Team Lead</b>
            <b>{ data.total_leads }</b>
        </div>
        <div className="squareBox">
            <b>Total Client</b>
            <b>{ data.total_clients }</b>
        </div>
        <div className="squareBox">
            <b>Total Projects</b>
            <b>{ data.total_projects }</b>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
