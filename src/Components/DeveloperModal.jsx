import React from "react";

const DeveloperModal = ({
  isAdding,
  isEditing,
  editedDeveloper,
  selectedDeveloper,
  handleInputChange,
  handleSubmitNewDeveloper,
  handleUpdate,
  handleEditClick,
  handleDelete,
  onClose,
}) => {
  return (
    <div className="add-task">
      <form className="">
          <button onClick={onClose} className='cross'>
            <i className="fa-solid fa-xmark"></i>
          </button>
        <div className="closebtn">
          <h2>{isAdding ? "Add Developer" : "Edit Developer"}</h2>
        </div>

        <div className="form-container">
          <div className="form-group">
            {/* <label className="form-label">Name</label> */}
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Name"
              value={editedDeveloper.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email"
              value={editedDeveloper.email}
              onChange={handleInputChange}
              />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Password"
              value={editedDeveloper.password}
              onChange={handleInputChange}
              />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password2"
              className="form-input"
              placeholder="Password"
              value={editedDeveloper.password}
              onChange={handleInputChange}
              />
          </div>
          <div className="form-group">
          <select
            name="job"
            className='status-select'
            onChange={handleInputChange}
          >
            <option value="">Job</option>
            <option value="front-end">Frontend</option>
            <option value="back-end">Backend</option>
            <option value="qa">QA</option>
          </select>
          </div>
        </div>

        <div className="debution">
        {
  isAdding ? (
      <button className="submit-btn-re" onClick={handleSubmitNewDeveloper}>Save</button>
    ) : isEditing ? (
      <button className="submit-btn-re" onClick={handleUpdate}>Save</button>
    ) : editedDeveloper ? (  
      <button className="submit-btn-re" onClick={onClose}>Close</button> 
    ) : (
      <button className="submit-btn-re" onClick={handleEditClick}>Cancel</button>  
    )
  }

        </div>
      </form>
    </div>
  );
};

export default DeveloperModal;
