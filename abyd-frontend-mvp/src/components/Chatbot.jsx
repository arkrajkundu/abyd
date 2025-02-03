import React from 'react'
import Chatbox from './Chatbox';
import Sidebar from './Sidebar';
import "./Chatbot.css";
function Chatbot() {
  return (
    <div className="chatbot" style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <div className="chatbot-navbar">
        <Sidebar />
      </div>
      <div id="chat-container">
        <Chatbox />
      </div>
    </div>
  )
}

export default Chatbot