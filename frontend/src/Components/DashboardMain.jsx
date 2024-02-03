import React from 'react'

export const DashboardMain = () => {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  return (
    <div className='m-4'>
      <h2>Dashboard</h2>
      <div>
        <div>
          <h1>Welcome, {username && username.split('@')[0]}!</h1>
          <p>Role: {role}</p>
        </div>
      </div>
    </div>
  )
}
