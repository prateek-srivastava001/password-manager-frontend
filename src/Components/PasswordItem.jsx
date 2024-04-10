import React, { useState } from 'react';
import { toast } from "react-toastify";
import PasswordForm from './PasswordForm';
import { deletePassword, editPassword, fetchPasswords } from '../api/api';

const PasswordItem = ({ password, onDelete }) => {
  const { id, url, email, password: pw } = password;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleExpand = () => setIsExpanded(!isExpanded);
  const handleEdit = () => setIsEditDialogOpen(true);
  const handleCloseEditDialog = () => setIsEditDialogOpen(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword); 

  const handleEditPassword = async (updatedPassword) => {
    try {
      const response = await editPassword(id, updatedPassword);
      if(response === true){
        toast.success("Credentials edited successfully");
      }else{
        toast.error("Some error occured");
      }
      await fetchPasswords();
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error editing password:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deletePassword(id);
      if(response === true){
        toast.success("Credentials deleted successfully");
      }else{
        toast.error("Some error occured");
      }
      onDelete(id);
    } catch (error) {
      console.error('Error deleting password:', error.message);
    }
  };

  return (
    <div className={`password-item ${isExpanded ? 'expanded' : ''}`}>
      <div onClick={handleExpand}>
        <p>{url}</p>
        {isExpanded ? '▲' : '▼'}
      </div>
      {isExpanded && (
        <div className="details">
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Password:</strong> {pw}</p>
          <p><strong>URL:</strong> {url}</p>
        </div>
      )}
      {isExpanded && (
        <div className="button-container">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      {isEditDialogOpen && (
        <div className="overlay">
          <div className="dialog">
            <PasswordForm
              initialUrl={url}
              email={email}
              password={pw}
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