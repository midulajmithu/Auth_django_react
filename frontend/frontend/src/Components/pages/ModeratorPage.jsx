import React from 'react';
import Navbar from '../Navbar';

const ModeratorPage = () => {
    return (
        <>
        <Navbar />
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome, Moderator!</h1>
            <p>This is the moderator dashboard where you can review and manage content.</p>
        </div>
        </>
    );
};

export default ModeratorPage;