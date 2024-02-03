import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    // Check if passwords match
    if (newPassword === confirmPassword) {
      // Make Axios request to change password
      axios.post('/api/change-password', { newPassword })
        .then(response => {
          console.log(response.data);
          // Handle success, e.g., show a success message to the user
        })
        .catch(error => {
          console.error('Error changing password:', error);
          // Handle error, e.g., show an error message to the user
        });
    } else {
      // Handle case where passwords do not match
      console.error('Passwords do not match');
    }
  };

  const handleDeleteAccount = () => {
    // Make Axios request to delete account
    axios.delete('/api/delete-account')
      .then(response => {
        console.log(response.data);
        // Handle success, e.g., redirect to login page or show a success message
      })
      .catch(error => {
        console.error('Error deleting account:', error);
        // Handle error, e.g., show an error message to the user
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Settings</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title">Change Password</h3>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password:</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button onClick={handleChangePassword} className="btn btn-primary">Change Password</button>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Delete Account</h3>
          <p className="card-text">Deleting your account will permanently remove all your data. Are you sure you want to proceed?</p>
          <button onClick={handleDeleteAccount} className="btn btn-danger">Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
