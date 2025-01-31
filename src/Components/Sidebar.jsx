import { useContext } from "react";
import "../Pages/Styles/Sidebar.css";
import { Link } from "react-router-dom";
import { SidebarContext } from "../Context";

const Sidebar = () => {
    const [sidebarOpened, setSidebarOpened] = useContext(SidebarContext);

  return (
    <div className={`sidebar ${!sidebarOpened && 'hidden'}`} id="sidebar">
      <h2 className="sidebar-header"><i className="fa-solid fa-house" style={{fontSize: '22px', paddingRight: '10px'}}></i>Sidebar</h2>
      <i className="fa-solid fa-arrow-left" onClick={()=>{setSidebarOpened(prev=>!prev)}}></i>
      <nav>
        <ul className="sidebar-nav">
          <li className="sidebar-nav-item"><i className="fa-solid fa-house"></i><Link to="/">Dashboard</Link></li>
          <li className="sidebar-nav-item"><i className="fa-solid fa-clipboard"></i><Link to="/projects">Projects</Link></li>
          <li className="sidebar-nav-item"><i className="fa-solid fa-users"></i><a href="#">Clients</a></li>
          <li className="sidebar-nav-item"><i className="fa-solid fa-user-plus"></i><a href="#">Team Leads</a></li>
          <li className="sidebar-nav-item"><i className="fa-solid fa-users"></i><a href="#">Users</a></li>
          <li className="sidebar-nav-item"><i className="fa-solid fa-person-running"></i><a href="#">Team Lead Dashboard</a></li>
          <li className="sidebar-nav-item"><i className="fa-solid fa-code"></i><Link to="/developer">Developer Dashboard</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
