import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const register = async () => {
    try {
      // Basic form validation
      if (!name.trim() || !email.trim() || !password.trim() || !mobile.trim()) {
        setError('All fields are required.');
        return;
      }

      // Additional validation: Check if the email or mobile number already exists
      const response = await axios.post('http://localhost:3000/api/signup', { name, email, password, mobile });
      console.log(response.data.message);

      // Show success message
      setSuccessMessage('Registration successful! Redirecting to login page...');

      // Reset form fields after successful registration
      setName('');
      setEmail('');
      setPassword('');
      setMobile('');

      // Navigate to the login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error);
      setError('Registration failed. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default RegisterForm;
