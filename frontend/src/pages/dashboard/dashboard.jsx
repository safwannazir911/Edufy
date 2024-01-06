import logo from "../../assets/logo/logo.png"
import "../../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";



const dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user-related data (e.g., access token)
    localStorage.removeItem("accessToken");


    // Redirect to the login page
    navigate("/login");
  };
  


  return (
    <div className="app">
    <div className='leftNav'>
    <div className="logo">
      <span className="MLogo">
        <img src={logo}></img>
      </span>
      <span className="WordLogo">
        <span className="FirstWord">E</span>dufy
      </span>
    </div>
    <a href="#dashboard">
    <div className="LeftButton">
    <span className="FL">
      <a href="#dashboard"><i class="fa-solid fa-table-columns"></i></a>
    </span>
    <span className="WW">
    <a href="#dashboard">Dashboard</a>
    </span>
    </div>
    </a>
    <a href="#calendar">
    <div className="LeftButton">
    <span className="FL">
      <a href="#calendar"><i class="fa-solid fa-calendar-days"></i></a>
    </span>
    <span className="WW">
    <a href="#calendar">Calendar</a>
    </span>
    </div>
    </a>
    <a href="#library">
    <div className="LeftButton">
    <span className="FL">
      <a href="#library"><i class="fa-solid fa-book"></i></a>
    </span>
    <span className="WW">
    <a href="#library">Library</a>
    </span>
    </div>
    </a>
    <a href="#classroom">
    <div className="LeftButton">
    <span className="FL">
      <a href="#classroom"><i class="fa-solid fa-people-roof"></i></a>
    </span>
    <span className="WW">
    <a href="#classroom">Classroom</a>
    </span>
    </div>
    </a>
    <a href="#cources">
    <div className="LeftButton">
    <span className="FL">
      <a href="#cources"><i class="fa-solid fa-star"></i></a>
    </span>
    <span className="WW">
    <a href="#cources">Cources</a>
    </span>
    </div>
    </a>
    <a href="#integration">
    <div className="LeftButton">
    <span className="FL">
      <a href="#integration"><i class="fa-solid fa-circle-notch"></i></a>
    </span>
    <span className="WW">
    <a href="#integration">Integration</a>
    </span>
    </div>
    </a>
    <a href="#assignment">
    <div className="LeftButton">
    <span className="FL">
      <a href="#assignment"><i class="fa-solid fa-paste"></i></a>
    </span>
    <span className="WW">
    <a href="#assignment">Assignment</a>
    </span>
    </div>
    </a>
    <a href="#attendance">
    <div className="LeftButton">
    <span className="FL">
      <a href="#attendance"><i class="fa-solid fa-clipboard-user"></i></a>
    </span>
    <span className="WW">
    <a href="#attendance">Attendance</a>
    </span>
    </div>
    </a>
    <a href="#disscussion">
    <div className="LeftButton">
    <span className="FL">
      <a href="#disscussion"><i class="fa-solid fa-message"></i></a>
    </span>
    <span className="WW">
    <a href="#disscussion">Disscussion</a>
    </span>
    </div>
    </a>
    <a href="#setting">
    <div className="ELeftButton">
    <span className="EFL">
      <a href="#setting"><i class="fa-solid fa-gear"></i></a>
    </span>
    <span className="EWW">
    <a href="#setting">Setting</a>
    </span>
    </div>
    </a>
    <a href="#logout">
    <div className="ELeftButton">
    <span className="EFL">
      <a href="#logout"><i class="fa-solid fa-right-from-bracket"></i></a>
    </span>
    <span className="EWW">
    <a onClick={handleLogout}>Log-Out</a>
    </span>
    </div>
    </a>
    </div>
    <div className="page">
    <div>
    <section id="dashboard">
    <h1>dashboard</h1>
    </section>
    </div><div>
    <section id="calendar">
    <h1>Calendar</h1>
    </section>
    </div><div>
    <section id="library">
    <h1>Library</h1>
    </section>
    </div><div>
    <section id="classroom">
    <h1>Classroom</h1>
    </section>
    </div>
    <div>
    <section id="cources">
    <h1>Cources</h1>
    </section>
    </div><div>
    <section id="integration">
    <h1>Integration</h1>
    </section>
    </div><div>
    <section id="assignment">
    <h1>Assignment</h1>
    </section>
    </div>
    <div>
    <section id="attendance">
    <h1>Attendance</h1>
    </section>
    </div>
    <div>
    <section id="disscussion">
    <h1>Disscussion</h1>
    </section>
    </div>
</div>
    </div>
  );
}

export default dashboard;
