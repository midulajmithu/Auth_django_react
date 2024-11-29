import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/login.jsx';
import AdminPage from './Components/pages/AdminPage.jsx';
import UserPage from './Components/pages/UserPage.jsx';
import ModeratorPage from './Components/pages/ModeratorPage.jsx';
import ProtectedRoute from './Components/ProtectedRoute';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';

    if (storedRole && isLoggedIn) {
      setUserRole(storedRole);
      setIsAuthenticated(true);
    }
    setLoading(false); // Ensure this runs after checking localStorage
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while state is being determined
  }

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={['admin']}
              userRole={userRole}
            >
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/moderator"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={['moderator']}
              userRole={userRole}
            >
              <ModeratorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={['user', 'admin', 'moderator']}
              userRole={userRole}
            >
              <UserPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
