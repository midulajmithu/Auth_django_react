import React from 'react';
import { useNavigate } from 'react-router-dom';
//import './Navbar.css'; 


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async  () => {

 
 try {
    

    // Clear authentication state
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    // Redirect to login page
    navigate('/login');

} catch (error) {
  console.error("Logout error:", error);
  // Optionally show a message or handle unexpected errors
}
    
  
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
