import logo from "../../assets/logo/logo.png"
import "../../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";



const dashboard = () => {
  const navigate = useNavigate();

  
  
  const LeftNavButton = ({ iconClass, label, href, onClick, className }) => (
    <a href={href}>
      <div className={`LeftButton ${className || ''}`} onClick={onClick}>
        <span className="FL">
          <a href={href}><i className={`fa-solid ${iconClass}`}></i></a>
        </span>
        <span className="WW">
          <a href={href}>{label}</a>
        </span>
      </div>
    </a>
  );
  const Section = ({ id, title }) => (
    <div>
      <section id={id}>
        <h1>{title}</h1>
      </section>
    </div>
  );
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
        <Section id="assignment" title="Assignment" />
        <Section id="attendance" title="Attendance" />
        <Section id="discussion" title="Discussion" />
      </div>
    </div>
  );
}

export default dashboard;
