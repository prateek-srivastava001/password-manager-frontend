import React from 'react';
import PasswordItem from './PasswordItem';

const PasswordList = ({ passwords, onDeletePassword }) => {
  const passwordsList = Array.isArray(passwords) ? passwords : Array.isArray(passwords?.data) ? passwords.data : [];
  return (
    <div className="password-list">
      <h2>Passwords</h2>
      {passwordsList.length > 0 ? (
        passwordsList.map(password => (
          <PasswordItem 
            key={password.id} 
            password={password} 
            onDelete={onDeletePassword} 
          />
        ))
      ) : (
        <p>No passwords available.</p>
      )}
    </div>
  );  
};

export default PasswordList;
