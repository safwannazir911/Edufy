import { useState } from "react";
import "../../styles/Login.css";
import axios from "axios";
import Logo from "../../assets/logo/productLogo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const Login = (props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        new URLSearchParams(formData).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const { username, role } = response.data.user;
      const accessToken = response.data.access_token;
      // localStorage.setItem("username", username);
      // localStorage.setItem("role", role);
      localStorage.setItem("username", response.data.user.username);
localStorage.setItem("role", response.data.user.role);

      localStorage.setItem("accessToken", accessToken);
      navigate('/app');
  
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid Username or Password");
      } else {
        setErrorMessage("An error occurred during login");
      }
    }
  };
  

  return (
    <>
      <div className="login-container">
        <div className="l-form-container">
          <div className="p-logo">
            <img src={Logo} alt="Logo" />
            <div className="p-logo-text">
              <span className="special">E</span>dufy
            </div>
          </div>
          {errorMessage && (
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="l-form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="User Name"
                value={formData.username}
                onChange={handleChange}
                className="form-in-common"
                required
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="form-in-common"
                required
              />

              <button type="submit" className="form-in-common l-btn">
                Sign in
              </button>
              <div className="l-msg">
                Not Registered?{" "}
                <span className="">
                  <Link to="/Register">register Now</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="r-svg-container">
          <div className="svg-container"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
