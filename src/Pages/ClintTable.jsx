// DeveloperTable.jsx
import { useContext, useEffect, useState } from "react";
import "./styles/developer.css";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import AddUser from "../Components/AddUser";
import { PopUpOpened } from "../Context";

const DeveloperTable = () => {
  const [developers, setDevelopers] = useState([]);
  const [showAddClient, setShowAddClient] = useState(false);
  const [focusedClient, setFocusedClient] = useState(null);
  const [editing, setedititng] = useState(false);
  const [, setIsPopUpOpened] = useContext(PopUpOpened);

  // Fetch data
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/users/client/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDevelopers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  
  const deleteClient = async (email) => {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`http://127.0.0.1:8000/users/client/`, {
          headers: { Authorization: `Bearer ${token}` },
          data: { email },
        });
  
        setDevelopers(developers.filter((dev) => dev.email !== email));
      } catch (error) {
        console.log(error);
      }
  }
 

  return (
    <>
    <Sidebar/>
    <Navbar/>
    <div className="mainDeveloperTable">
      <div className="table-container">
        <div className="project-tasks">
          <div className="tasks-head">
            <h1 className="dhtable">Client Table</h1>
            <button className="ADDbtn" onClick={()=>{
              setShowAddClient(true);
              setedititng(false);
              setIsPopUpOpened(true);
            }}>
              Add Client
            </button>
          </div>

          <table>
            <thead>
              <tr className="dheading">
                <td>Name</td>
                <td>Email</td>
                <td>Description</td>
                <td className="action">Actions</td>
              </tr>
            </thead>
            <tbody>
              {developers.map((dev, index) => (
                <tr
                  key={index}
                  className="clickable-row"
                >
                  <td className="responsivename">{dev.name}</td>
                  <td>{dev.email}</td>
                  <td title={dev.details}>
                    {dev.details?.length > 20
                      ? `${dev.details.slice(0, 20)}...`
                      : dev.details}
                  </td>
                  <td>
                    <div className="action-btn">
                      <button onClick={()=>{
                        setedititng(true);
                        setFocusedClient(dev);
                        setIsPopUpOpened(true)
                      }}>
                        <i className="fa-solid fa-pen-to-square edit" style={{color: 'green'}}></i>
                      </button>
                      <button onClick={()=>{
                        deleteClient(dev.email);
                      }}>
                        <i className="fa-solid fa-trash trash" style={{color: '#ee0000'}}></i>
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

    { showAddClient && <AddUser setState={ setShowAddClient } action="add" /> }
    { editing && <AddUser setState={ setedititng } action="edit" edit={ focusedClient } /> }
    </>
  );
};

export default DeveloperTable;
