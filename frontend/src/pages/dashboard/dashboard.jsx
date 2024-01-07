import logo from "../../assets/logo/logo.png"
import "../../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Assignment from "../../Components/Assignment";
import LeftNavButton from "../../Components/LeftNavButton";
import Section from "../../Components/Section";


const dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="app">

      <div className='leftNav'>
        
        <div className="logo">
          <span className="MLogo">
            <img src={logo} alt="Logo" />
          </span>
          <span className="WordLogo">
            <span className="FirstWord">E</span>dufy
          </span>
        </div>

        <LeftNavButton iconClass="fa-table-columns" label="Dashboard" href="#dashboard" />
        <LeftNavButton iconClass="fa-calendar-days" label="Calendar" href="#calendar" />
        <LeftNavButton iconClass="fa-book" label="Library" href="#library" />
        <LeftNavButton iconClass="fa-people-roof" label="Classroom" href="#classroom" />
        <LeftNavButton iconClass="fa-star" label="Courses" href="#courses" />
        <LeftNavButton iconClass="fa-circle-notch" label="Integration" href="#integration" />
        <LeftNavButton iconClass="fa-paste" label="Assignment" href="#assignment" />
        <LeftNavButton iconClass="fa-clipboard-user" label="Attendance" href="#attendance" />
        <LeftNavButton iconClass="fa-message" label="Discussion" href="#discussion" />
        <LeftNavButton iconClass="fa-gear" label="Setting" href="#setting" className="silver" />
        <LeftNavButton iconClass="fa-right-from-bracket" label="Log-Out" href="#logout" onClick={handleLogout} className="silver" />
      </div>

      <div className="page">
        <Section id="dashboard" title="Dashboard" />
        <Section id="calendar" title="Calendar" />
        <Section id="library" title="Library" />
        <Section id="classroom" title="Classroom" />
        <Section id="courses" title="Courses" />
        <Section id="integration" title="Integration" />
        <Section id="assignment" title="Assignment" comp={< Assignment />} />
        <Section id="attendance" title="Attendance" />
        <Section id="discussion" title="Discussion" />
      </div>

    </div>
  );
}

export default dashboard;
