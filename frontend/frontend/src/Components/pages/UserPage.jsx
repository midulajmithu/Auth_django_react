import React from 'react';
import Navbar from '../Navbar';

const UserPage = () => {
    return (
        <>
        <Navbar />
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome, User!</h1>
            <p>This is the user dashboard where you can view your profile and activities.</p>
        </div>
        </>
    );
};

export default UserPage;