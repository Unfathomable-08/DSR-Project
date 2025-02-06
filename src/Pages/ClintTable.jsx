// DeveloperTable.jsx
import { useEffect, useState } from "react";
import "./styles/developer.css";
import axios from "axios";
import DeveloperModal from "../Components/ClintModal"
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

const DeveloperTable = () => {
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

  // Add Developer Button Click
  const handleAddDeveloper = () => {
    setIsAdding(true);
    setIsEditing(false);
    setEditedDeveloper({ name: "", email: "", details: "" });
    setShowModal(true);
  };
  const handleSubmitNewDeveloper = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/users/client/",
        editedDeveloper,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(res.data);
      // Optionally update the developers state here
      setDevelopers([...developers, res.data]);
      setShowModal(false);
    } catch (error) {
      console.log("Error adding developer:", error);
    }
  };

const handleRowClick = (developer) => {
  setSelectedDeveloper(developer);
  setShowModal(true);
  window.scrollTo(0, 0);
};


  // Handle delete
  const handleDelete = async (email) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://127.0.0.1:8000/users/client/`, {
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
    setEditedDeveloper(developer); // Yeh ensure karega ke modal mein correct data aaye
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
        `http://127.0.0.1:8000/users/client/`,
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
    <Sidebar/>
    <Navbar/>
    <div className="mainDeveloperTable">
      <div className="table-container">
        <div className="project-tasks">
          <div className="tasks-head">
            <h1 className="dhtable">Client Table</h1>
            <button className="ADDbtn" onClick={handleAddDeveloper}>
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
                  <td className="responsivename" onClick={() => handleRowClick(dev)}>{dev.name}</td>
                  <td>{dev.email}</td>
                  <td title={dev.details} onClick={() => handleRowClick(dev)}>
                    {dev.details?.length > 20
                      ? `${dev.details.slice(0, 20)}...`
                      : dev.details}
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
