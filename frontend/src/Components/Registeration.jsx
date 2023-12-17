// RegistrationForm.js
import { useState } from 'react';
import axios from 'axios'
import logoImage from '../assets/images/93c2a468103088e7c8d8d89b8350029b.png';
import svgImage from '../assets/images/aa3d6e7d5ea897d6cabaae5b2f86ca96.png';


const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        role: '',
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMessage, setErrorMessage] = useState(null); // New state for error message
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
            const response = await axios.post('http://localhost:3000/register', formData);
            console.log('Server response:', response.data);
            // If successful, you might want to redirect or show a success message
        } catch (error) {
            // Handle errors
            if (error.response && error.response.data && error.response.data.message) {
                // If the server returns a custom error message
                setErrorMessage(error.response.data.message);
            } else {
                // If there's no custom error message, show a generic one
                setErrorMessage('An error occurred while processing your request.');
            }
        }
    };

    return (
        <div className='root_container'>
            <div className='svg_container'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="897" height="1024" viewBox="0 0 897 1024" fill="none">
                        <path d="M967 187.595C1074 1161.44 1239.34 1058.54 189.34 1025.44C-201.36 1013.13 133.991 783.467 133.991 484.973C133.991 186.48 -201.554 -5.05912 189.34 -5.05912C1084.5 -5.05895 1004.5 -77.0624 967 187.595Z" fill="url(#paint0_linear_1_19)" />
                        <defs>
                            <linearGradient id="paint0_linear_1_19" x1="523.156" y1="-13.9999" x2="1928.5" y2="421.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#5050A5" />
                                <stop offset="1" stopColor="#42868F" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <img src={svgImage} alt="Logo" />
            </div>
            <div className="container mt-4 inner_container">
                <div className='container logo_container'>
                    {/* Use the imported logo image */}
                    <img src={logoImage} alt="Logo" />
                    <h1><span>E</span>dufy</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <select
                            className="form-select"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>
                    <div className="mb-3">

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div className="mb-3">

                        <input
                            type="text"
                            className="form-control"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder='Full name'
                            required
                        />
                    </div>
                    <div className="mb-3">

                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password'
                            required
                        />
                    </div>
                    <div className="mb-3">

                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder='Confirm Password'
                            required
                        />
                    </div>
                    {errorMessage && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary container_button">
                            Register
                        </button>
                    </div>

                </form>
            </div>
        </div>




    );
};

export default RegistrationForm;
