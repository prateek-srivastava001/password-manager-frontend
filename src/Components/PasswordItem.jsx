import React, { useState, useCallback } from 'react';
import { toast } from "react-toastify";
import PasswordForm from './PasswordForm';
import { deletePassword, editPassword } from '../api/api';

const PasswordItem = ({ password, onDelete }) => {
  const { id, url, username, password: pw, name } = password;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePassword = useCallback(() => {
    setIsPasswordVisible(prev => !prev);
  }, []);

  const handleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleEdit = useCallback(() => {
    setIsEditDialogOpen(true);
  }, []);

  const handleCloseEditDialog = useCallback(() => {
    setIsEditDialogOpen(false);
  }, []);

  const handleEditPassword = async (updatedPassword) => {
    try {
      const response = await editPassword(id, updatedPassword);
      
      if (response === true) {
        toast.success("Credentials edited successfully");
        onDelete();
        handleCloseEditDialog();
      } else {
        toast.error("Some error occurred");
      }
    } catch (error) {
      console.error('Error editing password:', error.message);
      toast.error("Error editing password");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deletePassword(id);
      if (response === true) {
        toast.success("Credentials deleted successfully");
        onDelete();
      } else {
        toast.error("Some error occurred");
      }
    } catch (error) {
      console.error('Error deleting password:', error.message);
      toast.error("Error deleting password");
    }
  };

  return (
    <div className={`password-item ${isExpanded ? 'expanded' : ''}`}>
      <div onClick={handleExpand} className="password-header">
        <p><strong>{name}</strong> - {url}</p>
        <span className="expand-icon">{isExpanded ? '▲' : '▼'}</span>
      </div>
      {isExpanded && (
        <>
          <div className="details">
            <p><strong>URL:</strong> {url}</p>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Password:</strong> {isPasswordVisible ? pw : '******'}</p>
          </div>
          <div className="button-container">
            <button 
              onClick={handleTogglePassword} 
              className="toggle-password"
            >
              {isPasswordVisible ? 'Hide' : 'Show'} Password
            </button>
            <button onClick={handleEdit} className="edit-button">
              Edit
            </button>
            <button onClick={handleDelete} className="delete-button">
              Delete
            </button>
          </div>
        </>
      )}
      {isEditDialogOpen && (
        <div className="overlay">
          <div className="dialog">
            <PasswordForm
              initialName={name}
              initialUsername={username}
              initialPassword={pw}
              initialUrl={url}
              onSubmit={handleEditPassword}
              onCancel={handleCloseEditDialog}
              title="Edit Password"
              desc="Edit"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordItem;