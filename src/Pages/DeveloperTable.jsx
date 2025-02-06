import { useEffect, useState } from "react";
import "./styles/DeveloperTable.css";
import axios from "axios";
import DeveloperModal from "../Components/DeveloperModal"; 
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useLocation } from "react-router-dom";
import './Styles/Developer.css';

const DeveloperTable = () => {
  const location = useLocation();

  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [developers, setDevelopers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editedDeveloper, setEditedDeveloper] = useState({
    name: "",
    email: "",
    details: "",
  });

  // Fetch data
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/users/leaddeveloper/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if(location.pathname === '/developerDetails'){
          setDevelopers(res.data.developers);
          console.log(res.data.developers);
        } else {
          setDevelopers(res.data.leads);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location.pathname]);

  // Add Developer Button Click
  const handleAddDeveloper = () => {
    setIsAdding(true);
    setIsEditing(false);
    setEditedDeveloper({ name: "", email: "", job: "", role: "developer" });
    setShowModal(true);
  };

  // Submit New Developer
  const handleSubmitNewDeveloper = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    const token = localStorage.getItem("token");

    try {
      console.log(editedDeveloper)
      const res = await axios.post(
        "http://127.0.0.1:8000/users/leaddeveloper/",
        editedDeveloper,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(res.data);
      setDevelopers([...developers, res.data]);
      setShowModal(false);
    } catch (error) {
      console.log("Error adding developer:", error);
    }
  };

  const handleRowClick = (developer) => {
    setSelectedDeveloper(developer);
    setShowModal(true);
    console.log(developer);
  };

  // Handle Delete
  const handleDelete = async (email) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://127.0.0.1:8000/users/leaddeveloper/`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { email },
      });
      setDevelopers(developers.filter((dev) => dev.email !== email));
      setShowModal(false);
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // Handle Edit Click
  const handleEditClick = (developer) => {
    setIsAdding(false);
    setIsEditing(true);
    setEditedDeveloper(developer);
    setShowModal(true);
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    setEditedDeveloper((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Update
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(
        `http://127.0.0.1:8000/users/leaddeveloper/`,
        editedDeveloper,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDevelopers(
        developers.map((dev) => (dev.email === res.data.email ? res.data : dev))
      );
      setShowModal(false);
    } catch (error) {
      console.log("Update error:", error);
    }
  };

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
              <button className="" onClick={handleAddDeveloper}>
                {location.pathname === '/developerDetails' ? 'Add Developers' : 'Add Team Leads'}
              </button>
            </div>

            <table>
              <thead>
                <tr className="">
                  <td>Name</td>
                  <td>Email</td>
                  <td>Role</td>
                  <td className="">Actions</td>
                </tr>
              </thead>
              <tbody>
                {developers.map((dev, index) => (
                  <tr key={index} className="">
                    <td onClick={() => handleRowClick(dev)}>{dev.name}</td>
                    <td>{dev.email}</td>
                    <td onClick={() => handleRowClick(dev)} title={dev.details}>
                      {dev?.job?.split('-')?.join('')}
                    </td>
                    <td>
                      <div className="action-btn">
                        <button onClick={() => handleEditClick(dev)}>
                          <i className="fa-solid fa-pen-to-square edit" style={{color: 'green'}}></i>
                        </button>
                        <button onClick={() => handleDelete(dev.email)}>
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

        {showModal && (
          <DeveloperModal
            isAdding={isAdding}
            isEditing={isEditing}
            editedDeveloper={editedDeveloper}
            selectedDeveloper={selectedDeveloper}
            handleInputChange={handleInputChange}
            handleSubmitNewDeveloper={handleSubmitNewDeveloper}
            handleUpdate={handleUpdate}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default DeveloperTable;
