import { useContext } from "react";
import "../Pages/Styles/Sidebar.css";
import { Link } from "react-router-dom";
import { SidebarContext, UserPosition } from "../Context";

const Sidebar = () => {
    const [userPosition] = useContext(UserPosition)
    const [sidebarOpened, setSidebarOpened] = useContext(SidebarContext);

  return (
    <div className={`sidebar ${!sidebarOpened && 'hidden'}`} id="sidebar">
      <h2 className="sidebar-header"><i className="fa-solid fa-house" style={{fontSize: '22px', paddingRight: '10px'}}></i>Sidebar</h2>
      <i className="fa-solid fa-arrow-left" onClick={()=>{setSidebarOpened(prev=>!prev)}}></i>
      <nav>
        <ul className="sidebar-nav">
          <li className="sidebar-nav-item"><i className="fa-solid fa-house"></i><Link to="/">Dashboard</Link></li>
          <li className="sidebar-nav-item"><i className="fa-solid fa-clipboard"></i><Link to="/projects">Projects</Link></li>
          <li className="sidebar-nav-item"><i className="fa-solid fa-users//"></i><Link to="/clients">Clients</Link></li>
          <li className="sidebar-nav-item"><i className="fa-solid fa-user-plus"></i><Link to="/leadDetails">Team Leads</Link></li>
          <li className="sidebar-nav-item"><i className="fa-solid fa-users//"></i><Link to="/developerDetails">Developers</Link></li>
          {
            userPosition == 'admin' ?
            <li className="sidebar-nav-item"><i className="fa-solid fa-code"></i><Link to="/developer">Admin Dashboard</Link></li>
            :
            <li className="sidebar-nav-item"><i className="fa-solid fa-code"></i><Link to="/developer">{ userPosition == 'lead' ? 'Team Lead Dashboard' : 'Developer Dashboard' }</Link></li>
          }
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
