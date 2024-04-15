import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const login = async () => {
    try {
      // Check if email and password are not empty
      if (!email || !password) {
        setErrorMessage('Please enter both email and password.');
        return;
      }

      const response = await axios.post('/api/login', { email, password });
      console.log(response.data.message);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Invalid email or password.');
    }
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      <p>Don't have an account? <span onClick={handleCreateAccount}>Create new</span></p>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default LoginForm;
