import React, { useState, useEffect } from 'react';
import Dashboard from './Components/Dashboard';
import LoginSignup from './Components/LoginSignup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPasswords } from './api/api';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const userIsLoggedIn = await fetchPasswords();
        setIsLoggedIn(userIsLoggedIn);
      } catch (error) {
        console.error('Error checking login status:', error.message);
      }
    };

    checkLoggedIn();
  }, []);

  const handleLoggedIn = (loggedIn) => {
    setIsLoggedIn(loggedIn);
  };

  return (
    <div className="app">
      <ToastContainer />
      {isLoggedIn ? (
        <Dashboard setIsLoggedIn={handleLoggedIn} passwords={passwords} setPasswords={setPasswords} />
      ) : (
        <LoginSignup setIsLoggedIn={handleLoggedIn} />
      )}
    </div>
  );
};

export default App;
