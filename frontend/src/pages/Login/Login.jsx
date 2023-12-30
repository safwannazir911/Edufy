import { useState } from "react";
import "../../styles/Login.css";
import Logo from "../../assets/logo/productLogo.png";

const Login = (props) => {
  // local state to hold form data
  // type object hold username and password
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  //   change function that changes the value of formdata attributes when user inputs the data
  //   name of the input field is same as the object attribte name inorder to identify the attribute currently changing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //   function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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

          <div className="l-form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Email"
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
                Not Registered? <span className="">Register Now</span>
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
