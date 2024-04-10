import React from 'react';
import PasswordItem from './PasswordItem';

const PasswordList = ({ passwords, onDeletePassword }) => (
  <div className="password-list">
    <h2>Passwords</h2>
    {passwords.map(password => (
      <PasswordItem key={password.id} password={password} onDelete={onDeletePassword} />
    ))}
  </div>
);

export default PasswordList;