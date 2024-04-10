import React, { useState, useEffect } from 'react';
import PasswordForm from './PasswordForm';
import PasswordList from './PasswordList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import { fetchPasswords, addPassword } from '../api/api';

const Dashboard = ({ setIsLoggedIn, passwords, setPasswords }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllPasswords();
  }, []);

  const fetchAllPasswords = async () => {
    try {
      const data = await fetchPasswords();
      setPasswords(data);
    } catch (error) {
      console.error('Error fetching passwords:', error.message);
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleAddPassword = async (newPassword) => {
    try {
      const response = await addPassword(newPassword);
      if (response === true) {
        toast.success("Password added successfully");
        await fetchAllPasswords();
        closeDialog();
      } else {
        toast.error("Some error occurred");
      }
    } catch (error) {
      console.error('Error adding password:', error.message);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  const handleSearch = (e) => setSearchTerm(e.target.value);

  return (
    <div className="app">
      <ToastContainer />
      <h1 className="heading">Password Manager
      <button className="logout-button" onClick={handleLogout}>Logout</button></h1>
      <p className="description">Safely manage and access your passwords</p>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search passwords..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="add-button" onClick={openDialog}>+ Add New Password</button>
        <PasswordList passwords={passwords} onDeletePassword={fetchAllPasswords} />
        {isDialogOpen && (
          <div className="overlay">
            <div className="dialog">
              <PasswordForm onSubmit={handleAddPassword} onCancel={closeDialog} title="Add New Password" desc="Add" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
