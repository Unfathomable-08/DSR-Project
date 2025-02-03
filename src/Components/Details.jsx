import React from 'react'
import '../Pages/Styles/Details.css'

const Details = (props) => {
console.log(props.data)

  return (
    <div className="details-view-task">
      <div className="details-view-task-div">
        <h1>{props?.data?.name}</h1>
        <div className="details-task-cont">
          <div className="details-task">
            <button onClick={()=>{props.setState(false); setIsPopUpOpened(false)}} className='cross'>
                <i className="fa-solid fa-xmark"></i>
            </button>
            <h3>Project Details</h3>
            <p><b>Staus: </b><span>{props?.data?.status}</span></p>
            <p><b>Paid: </b><span>{props?.data?.paid}</span></p>
            <p><b>Deadline: </b><span>{props?.data?.deadline ? props.data.deadline.split('T')[0] + " " + props.data.deadline.split('T')[1].split(':')[0] + ':' + props.data.deadline.split('T')[1].split(':')[1] : ''}</span></p>
            <p><b>Team Members: </b><span>{}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
