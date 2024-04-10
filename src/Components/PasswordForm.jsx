import React, { useState } from 'react';
import InputField from './InputField';

const PasswordForm = ({initialUrl, email: initialEmail, password: initialPassword, onSubmit, onCancel, title, desc }) => {
  const [url, setURL] = useState(initialUrl);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPassword = { url, email, password };
    onSubmit(newPassword);
    setURL('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <p className="description-add-password">Enter the necessary information to {desc.toLowerCase()} this password.</p>
      <InputField
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setURL(e.target.value)}
        required
      />
      <InputField
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="button-container">
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
        <button className="add-button" type="submit">{desc}</button>
      </div>
    </form>
  );
};

export default PasswordForm;
