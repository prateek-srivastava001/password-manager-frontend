import React, { useState } from 'react';
import './loginsignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import { ToastContainer, toast } from 'react-toastify';
import { login, signup } from '../api/api';

const LoginPage = ({ setIsLoggedIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      if (response === true) {
        setIsLoggedIn(true);
        toast.success("Logged in successfully");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({ name, email, password });
      if (response === true) {
        toast.success("Account created successfully");
        setName("");
        setEmail("");
        setPassword("");
        setIsLoginMode(true);
        document.getElementById("login-tab").click();  
      } else {
        toast.error("Some error occurred");
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="header">
      <div className="text">{isLoginMode ? 'Login' : 'Sign Up'}</div>
      <div className="underline"></div>
      </div>
      <form className="inputs">
      {!isLoginMode && (
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="submit-container">
          {isLoginMode ? (
            <button type="submit" className="submit" onClick={handleLogin}>Login</button>
          ) : (
            <button type="submit" className="submit" onClick={handleSignup}>Sign Up</button>
          )}
        </div>
        <div className="toggle">
          <span>{isLoginMode ? "Don't have an account?" : "Already have an account?"}</span>
          <button type="button" onClick={() => setIsLoginMode(!isLoginMode)}>
            {isLoginMode ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </form>
    </div>
    
  );
};

export default LoginPage;