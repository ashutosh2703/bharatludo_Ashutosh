import React from 'react';
import { useHistory } from 'react-router-dom';
import './Component-css/BottomNav.css?v=0.1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTable, faUsers, faCommentDots, faUser } from '@fortawesome/free-solid-svg-icons';

export default function BottomNav() {
  const history = useHistory();

  const access_token = localStorage.getItem("token");

  const handleNavClick = (path) => {
    if (access_token) {
      history.push(path);
    } else {
      // Optionally redirect to login if no token
      history.push('/login');
    }
  };

  return (
    <div className="bottom-nav">
      <div className="nav-item" onClick={() => handleNavClick('/landing')}>
        <FontAwesomeIcon icon={faHome} />
      </div>
      <div className="nav-item" onClick={() => handleNavClick('/wallet')}>
        <FontAwesomeIcon icon={faTable} />
      </div>
      <div className="nav-item" onClick={() => handleNavClick('/refer')}>
        <FontAwesomeIcon icon={faUsers} />
      </div>
      <div className="nav-item" onClick={() => handleNavClick('/contact-us')}>
        <FontAwesomeIcon icon={faCommentDots} />
      </div>
      <div className="nav-item" onClick={() => handleNavClick('/profile')}>
        <FontAwesomeIcon icon={faUser} />
      </div>
    </div>
  );
}
