import React from 'react';
import { useNavigate } from 'react-router-dom';
//import './Navbar.css'; 

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout =  () => {

    
    // Clear authentication state
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    // Redirect to login page
    navigate('/');

    
  
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="d-flex ms-auto">
        <button
          className="btn btn-link text-white"
          onClick={handleLogout}
          style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
