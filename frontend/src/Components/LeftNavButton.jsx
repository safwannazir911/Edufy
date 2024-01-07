import React from 'react'

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

export default LeftNavButton;