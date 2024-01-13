import React from 'react';
import logoImage from '../assets/images/93c2a468103088e7c8d8d89b8350029b.png';
import { useNavigate } from 'react-router-dom';
import { LeftNavButton } from './LeftNavButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faCalendarDays,
  faLandmark,
  faUsersRectangle,
  faStar,
  faLink,
  faBook,
  faUserPlus,
  faMessage,
  faGear,
  faCircleQuestion,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

export const LeftNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div className='sidebar'>
      <div className='logo_container m-1'>
        {/* Use the imported logo image */}
        <img src={logoImage} alt='Logo' />
        <h1>
          <span>E</span>dufy
        </h1>
      </div>
      <div className='sidebar_container'>
        <LeftNavButton label='Dashboard' icon={<FontAwesomeIcon size="2x" icon={faHouse} />} link='/app/dashboard' />
        <LeftNavButton label='Calendar' icon={<FontAwesomeIcon size="2x" icon={faCalendarDays} />} link='/app/calendar' />
        <LeftNavButton label='Library' icon={<FontAwesomeIcon size="2x" icon={faLandmark} />} link='/app/library' />
        <LeftNavButton label='Classroom' icon={<FontAwesomeIcon size="2x" icon={faUsersRectangle} />} link='/app/classroom' />
        <LeftNavButton label='Courses' icon={<FontAwesomeIcon size="2x" icon={faStar} />} link='/app/courses' />
        <LeftNavButton label='Integration' icon={<FontAwesomeIcon size="2x" icon={faLink} />} link='/app/integration' />
        <LeftNavButton label='Assignment' icon={<FontAwesomeIcon size="2x" icon={faBook} />} link='/app/assignment' />
        <LeftNavButton label='Attendance' icon={<FontAwesomeIcon size="2x" icon={faUserPlus} />} link='/app/attendance' />
        <LeftNavButton label='Discussion' icon={<FontAwesomeIcon size="2x" icon={faMessage} />} link='/app/discussion' />
      </div>
      <div className='sidebar_container sidebar_container_dark'>
        <LeftNavButton label='Settings' icon={<FontAwesomeIcon style={{ color: "#4d4d4d", }} size="2x" icon={faGear} />} link='/app/settings' labelColor="dark" />
        <LeftNavButton label='Help' icon={<FontAwesomeIcon style={{ color: "#4d4d4d", }} size="2x" icon={faCircleQuestion} />} link='/app/help' labelColor="dark" />
        <LeftNavButton label='Log Out' icon={<FontAwesomeIcon style={{ color: "#4d4d4d", }} size="2x" icon={faRightFromBracket} />} link='/logout' onClick={handleLogout} labelColor="dark" />
      </div>
    </div>
  );

};
