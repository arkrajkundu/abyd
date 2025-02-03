import React from 'react'
import './Header.css'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };
  return (
    <>
      <header className='header'>
        <p>Dashboard</p>
        {/* <button className='logout-btn' onClick={handleLogout}>Logout</button> */}
        <img src={assets.pfp} className="profile-icon"></img>
      </header>
      <hr />
    </>
  )
}

export default Header
