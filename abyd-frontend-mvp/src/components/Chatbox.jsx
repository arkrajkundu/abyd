import React, { useRef, useState, useEffect } from "react";
import "./Chatbox.css";
import emailjs from "@emailjs/browser";
import handIcon from '../assets/wave_9437514.png';
import girl from '../assets/girl_4140073.png';
import assistant from '../assets/assistant_7498826.png';
import axios from 'axios';
import config from "../config";

const Chatbox = () => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isPerson1Turn, setIsPerson1Turn] = useState(true);
  const form = useRef();
  const [flashMessage, setFlashMessage] = useState("");

  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await axios.get(`${config.API_BASE_URL}/auth/get-user-data`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        } catch (err) {
          console.error('Error fetching user data:', err);
          setUserData(null); // Ensure stale data isn't used
        }
      }
    };

    fetchUserData();
  }, []);

  const sendEmail = async () => {
    try {
      if (!form.current) {
        setFlashMessage("Error: Form reference is not found.");
        return;
      }

      const response = await emailjs.sendForm(serviceID, templateID, form.current, publicKey);
      console.log("EmailJS response:", response);

      setFlashMessage("Email sent successfully!");

      setTimeout(() => {
        setFlashMessage("");
      }, 6000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setFlashMessage("Error sending email. Please try again.");
    }
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const newMessage = {
        text: input,
        sender: isPerson1Turn ? "Person1" : "Person2",
        time: currentTime,
      };

      setMessages([...messages, newMessage]);
      setInput("");

      if (form.current) {
        form.current.elements["message"].value = newMessage.text;
        form.current.elements["sender"].value = newMessage.sender;
      }

      setIsPerson1Turn(!isPerson1Turn);

      // Send the email
      await sendEmail();
    } else {
      console.warn("Input is empty. Cannot send message.");
    }
  };

  return (
    <div className="chat-container2">
      <div className="dash2">
        <div className="dashText2">Dashboard &nbsp; &gt; &nbsp; Do it Yourself &nbsp; &gt; &nbsp; Chatbot</div>
        <img src={girl} alt="man" className="manImage2" />
      </div>
      <div className="chat-abyd2">
        <div className="chat-abyd-head2">
          Chat with ABYD Team <img src={handIcon} alt="hand" className="home__hand2" />
        </div>
        <div className="chat-abyd-def2">
          We're here to help! Ask your questions, and we'll assist you
        </div>
        <div className="chat-abyd-with2">
          <img src={assistant} alt="assistant" className="manImage2" />
          You are chatting with (Name)
        </div>
      </div>
      <div className="chat-box2">
        {messages.map((msg, index) => (
          <div key={index} className="message message-right2">
            <div className="timeandMessage2">
              <div className="timestamp2">{msg.time}</div>
              <div className="messageText2">{msg.text}</div>
            </div>
            <div className="userName2">
              <img src={girl} alt="man" className="manImage2" />
            </div>
          </div>
        ))}
      </div>
      <form ref={form} className="input-area2">
        {/* Hidden fields for hardcoded email and name */}
        {userData && (
          <>
            <input type="hidden" name="email" value={userData?.email || ''} />
            <input type="hidden" name="name" value={userData?.username || ''} />
          </>
        )}
        <input type="hidden" name="sender" />
        {/* Visible input for the message */}
        <input
          className="input-box2"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          name="message"
        />
        <button className="send-button2" type="button" onClick={handleSendMessage}>
          Send
        </button>
      </form>
      {flashMessage && <div className="flash-message2">{flashMessage}</div>}
    </div>
  );
};

export default Chatbox;
