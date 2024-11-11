import React, { useState, useEffect } from 'react';
import PasswordForm from './PasswordForm';
import PasswordList from './PasswordList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import { fetchPasswords, addPassword } from '../api/api';

const Dashboard = ({ setIsLoggedIn }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [passwords, setPasswords] = useState([]);  // Changed to array instead of object

  useEffect(() => {
    fetchAllPasswords();
  }, []);

  const fetchAllPasswords = async () => {
    try {
      const data = await fetchPasswords();
      setPasswords(Array.isArray(data) ? data : 
                  Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.error('Error fetching passwords:', error.message);
      toast.error("Error fetching passwords");
      setPasswords([]);
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
      toast.error("Error adding password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const username = localStorage.getItem('name');

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredPasswords = passwords.filter(password =>
    password.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    password.url?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    password.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <ToastContainer />
      <h1 className="heading">
        Password Manager
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </h1>
      <p className="description">Safely manage and access your passwords</p>
      <h1 className="heading-2">Hey, {username} :)</h1>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search passwords..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="add-button" onClick={openDialog}>+ Add New Password</button>
      </div>
      
      <PasswordList 
        passwords={filteredPasswords}
        onDeletePassword={fetchAllPasswords} 
      />
      
      {isDialogOpen && (
        <div className="overlay">
          <div className="dialog">
            <PasswordForm 
              onSubmit={handleAddPassword} 
              onCancel={closeDialog} 
              title="Add New Password" 
              desc="Add"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
