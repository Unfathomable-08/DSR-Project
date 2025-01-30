import { useEffect, useState } from "react";
import "../Pages/Styles/Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [isHidden, setIsHidden] = useState(window.innerWidth <= 860);

    useEffect(() => {
        const handleResize = () => {
          setIsHidden(window.innerWidth <= 860);
        };
        window.addEventListener("resize", handleResize);
        
        return () => window.removeEventListener("resize", handleResize);
      }, []);

  return (
    <div className={`sidebar ${isHidden && 'hidden'}`} id="sidebar">
      <h2 className="sidebar-header"><i className="fa-solid fa-house" style={{fontSize: '22px', paddingRight: '10px'}}></i>Sidebar</h2>
      <nav>
        <ul className="sidebar-nav">
          <li className="sidebar-nav-item"><i className="fa-solid fa-house"></i><Link to="/">Dashboard</Link></li>
          <li className="sidebar-nav-item"><i className="fa-solid fa-clipboard"></i><Link to="/projects">Projects</Link></li>
          <li className="sidebar-nav-item"><i className="fa-solid fa-users"></i><a href="#">Clients</a></li>
          <li className="sidebar-nav-item"><i className="fa-solid fa-user-plus"></i><a href="#">Team Leads</a></li>
          <li className="sidebar-nav-item"><i className="fa-solid fa-users"></i><a href="#">Users</a></li>
          <li className="sidebar-nav-item"><i className="fa-solid fa-person-running"></i><a href="#">Team Lead Dashboard</a></li>
          <li className="sidebar-nav-item"><i className="fa-solid fa-code"></i><a href="#">Developer Dashboard</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
