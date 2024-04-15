import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = () => {
  const [users, setUsers] = useState([]);
  const [showLogin, setShowLogin] = useState(true); 
  const [editMode, setEditMode] = useState(false); 
  const [userIdToEdit, setUserIdToEdit] = useState(null); 
  const signUp = async () => {
  const data= { 
     name: e.target.name.value,
    email:e.target.email.value,
    password:e.target.pasword.value
  }
    try {
      await axios.post('/api/create', {data});
      setName('');
      setEmail('');
      setPassword('');
      setShowLogin(true); 
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="form-container">
      
      <input type="text" placeholder="Name" name ='name'  autoComplete='off'/>
      <input type="email" placeholder="Email" email ='email' autoComplete='off' />
      <input type="password" placeholder="Password" password='password' autoComplete='off'/>
      
      {editMode ? (
        <button  >Save Changes</button>
      ) : (
        <button onClick={signUp}>Create User</button>
      )}
      <button onClick={() => setShowLogin(true)}>Back to Login</button>
    </div>
  );
};

export default AddUserForm;
