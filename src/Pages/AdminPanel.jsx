import './Styles/AdminPanel.css';
import Navbar from '../Components/Navbar';
import { Bar, ChartLine } from '../Components/Chart';

const AdminPanel = () => {
  return (
    <div>
      <Navbar />
      <div className="admin-cont">
        <div className="bar admin">
            <div className="chart">
                <Bar />
            </div>
        </div>
        <div className="chart admin">
            <div className="chart">
                <ChartLine />
            </div>
        </div>
      </div>
      <div className="bottomBoxes">
        <div className="squareBox">
            <b>Total Dev</b>
            <b>08</b>
        </div>
        <div className="squareBox">
            <b>Total Team Lead</b>
            <b>03</b>
        </div>
        <div className="squareBox">
            <b>Total Client</b>
            <b>10</b>
        </div>
        <div className="squareBox">
            <b>Total Projects</b>
            <b>20</b>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
