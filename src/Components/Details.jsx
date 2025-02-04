import React, { useContext } from 'react'
import '../Pages/Styles/Details.css'
import { PopUpOpened } from '../Context'

const Details = (props) => {
console.log(props.data)
  const [, setIsPopUpOpened] = useContext(PopUpOpened);

  return (
    <div className="details-view-task">
      <div className="scrollbar-cont">
        <div className="details-view-task-div">
          <h1>{props?.data?.name}</h1>
            <div className="details-task">
              <button onClick={()=>{props.setState(false); setIsPopUpOpened(false)}} className='cross'>
                  <i className="fa-solid fa-xmark"></i>
              </button>
              <h3>Project Details</h3>
              <p><b>Staus: </b><span>{props?.data?.status}</span></p>
              <p><b>Paid: </b><span>{props?.data?.paid ? 'Paid' : 'Unpaid'}</span></p>
              <p><b>Assigned By: </b><span>{props?.data?.assigned_by}</span></p>
              <p><b>Team Members: </b><span>{props?.data?.assigned_to.join(', ')}</span></p>
              <p><b>Assigned On: </b><span>{props?.data?.assigned_on ? props.data.assigned_on.split('T')[0] + " " + props.data.assigned_on.split('T')[1].split(':')[0] + ':' + props.data.assigned_on.split('T')[1].split(':')[1] : ''}</span></p>
              <p><b>Deadline: </b><span>{props?.data?.deadline ? props.data.deadline.split('T')[0] + " " + props.data.deadline.split('T')[1].split(':')[0] + ':' + props.data.deadline.split('T')[1].split(':')[1] : ''}</span></p>
              <p><b>Description: </b><br /><span>{props?.data?.description}</span></p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
