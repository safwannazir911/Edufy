import React from 'react'

export const LeftNavButton = ({ label, icon, link, onClick, labelColor }) => {
  const labelStyle = {
    color: labelColor === 'dark' ? '#4d4d4d' : '', // Set color based on label_color prop
  };


  return (
    <div onClick={onClick}  >
      <a href={link} className={`text-${labelColor} p-2 m-1`}>
          {icon}
          <span style={labelStyle}>{label}</span>
      </a>
    </div>
  )
}
