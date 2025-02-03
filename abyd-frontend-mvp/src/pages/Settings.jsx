import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';
import Sidebar from '../components/Sidebar';
import assets from '../assets/assets';

const Settings = ({ setIsAuthenticated, username, email }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className='settings'>
      <Sidebar />
      <div className='settings-right'>
        <div>Dashboard &gt; Settings</div>
        <div className="settings-header">
          <h2>Settings</h2>
          <p>Manage your account preferences and platform configurations.</p>
        </div>
        <div className='user-info'>
          <img src={assets.pfp} alt="" />
          <div>
            <p>{username}</p>
            <p>{email}</p>
          </div>
        </div>
        <div className="account-settings">
          <h3>Account Settings</h3>
          <div className="options">
            <div>Password</div>
            <div>Help & Support</div>
            <div>Privacy Policy</div>
            <div>Delete Account</div>
            <div onClick={handleLogout}>Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
