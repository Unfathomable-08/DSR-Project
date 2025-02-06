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
    <div className="modal-overlay">
      <div className="modal">
          <button onClick={onClose} className='cross'>
            <i className="fa-solid fa-x"></i>
          </button>
        <div className="closebtn">
          <h2>{isAdding ? "Add Clint" : "Edit Clint"}</h2>
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
            {/* {/* {/* <label className="form-label">Email</label> */} 
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
            {/* {/* {/* <label className="form-label">Full Description</label> */} 
            <textarea
              name="details"
              className="form-input form-decript"
              placeholder="Full Description"
              value={editedDeveloper.details}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="debution">
        {
  isAdding ? (
    <button onClick={handleSubmitNewDeveloper}>Save</button>
  ) : isEditing ? (
    <button onClick={handleUpdate}>Save</button>
  ) : editedDeveloper ? (  
    <button onClick={onClose}>Close</button> 
  ) : (
    <button onClick={handleEditClick}>Cancel</button>  
  )
}

        </div>
      </div>
    </div>
  );
};

export default DeveloperModal;
