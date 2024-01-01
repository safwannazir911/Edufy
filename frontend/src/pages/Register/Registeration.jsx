import { useState } from 'react';
import axios from 'axios';
import logoImage from '../../assets/images/93c2a468103088e7c8d8d89b8350029b.png';
import svgImage from '../../assets/images/aa3d6e7d5ea897d6cabaae5b2f86ca96.png';

const Registration = () => {
    const [formData, setFormData] = useState({
        role: '',
        email: '',
        name: '', // Change 'fullName' to 'name'
        password: '',
        confirmPassword: '',
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

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
            const response = await axios.post('http://127.0.0.1:8000/users/register', formData);
            console.log('Server response:', response.data);
            // If successful, show success message
            setSuccessMessage('Registration successful!'); // Add this line
            setErrorMessage(null); // Reset error message
        } catch (error) {
            // Handle errors
            if (error.response && error.response.status === 400 && error.response.data && error.response.data.detail) {
                // If the server returns a 400 status with a detail message
                setErrorMessage(error.response.data.detail);
            } else {
                // If there's no custom error message or it's not a 400 status, show a generic one
                setErrorMessage('An error occurred while processing your request.');
            }
            setSuccessMessage(null); // Reset success message
        }
    };

    return (
        <div className='root_container'>
            <div className='svg_container'>
                <svg xmlns="http://www.w3.org/2000/svg" width="897" height="1024" viewBox="0 0 897 1024" fill="none">
                    {/* SVG path and linear gradient definitions */}
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
                            name="name"  // Change 'fullName' to 'name'
                            value={formData.name}  // Change 'fullName' to 'name'
                            onChange={handleChange}
                            placeholder='username'
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
                    {successMessage && (
                        <div className="alert alert-success mt-3" role="alert">
                            {successMessage}
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

export default Registration;
