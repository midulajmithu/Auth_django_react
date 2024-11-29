import React from 'react';
import Navbar from '../Navbar';

const AdminPage = () => {
    return (
        <>
        <Navbar />
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome, Admin!</h1>
            <p>This is the admin dashboard where you can manage users and content.</p>
        </div>
        </>
    );
};

export default AdminPage;
