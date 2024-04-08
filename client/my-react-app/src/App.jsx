import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 
axios.defaults.baseURL="http://localhost:3000"

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [showLogin, setShowLogin] = useState(true); 
  const [editMode, setEditMode] = useState(false); 
  const [userIdToEdit, setUserIdToEdit] = useState(null); 


  useEffect(() => {
    fetchAllUsers();
  }, []);

  const createUser = async () => {
    try {
      await axios.post('/api/create', { name, email, password });
      fetchAllUsers();
      setName('');
      setEmail('');
      setPassword('');
      setShowLogin(true);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/delete/${userId}`);
      fetchAllUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const editUser = async () => {
    try {
      await axios.put(`/api/update/${userIdToEdit}`, { name, email, password });
      fetchAllUsers();
      setEditMode(false);
      setUserIdToEdit(null);
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post('/api/login', { email, password });
      console.log(response.data.message)
      const token = response.data.token;
      localStorage.setItem('token', token); 

    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEditClick = (userId) => {
    const userToEdit = users.find(user => user._id === userId);
    if (userToEdit) {
      setEditMode(true);
      setUserIdToEdit(userId);
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setPassword('');
    }
  }

  return (
    <div>
      {showLogin ? (
        <div className="form-container"> 
          <h2>Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={login}>Login</button>
          <button onClick={() => setShowLogin(false)}>Create User</button>
        </div>
      ) : (
        
         <div className="form-container"> 
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
          {editMode ? (
            <button onClick={editUser}>Save Changes</button>
          ) : (
            <button onClick={createUser}>Create User</button>
          )}
          <button onClick={() => setShowLogin(true)}>Back to Login</button>
          
        </div>
      )}
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => deleteUser(user._id)}>Delete</button>
            <button onClick={() => handleEditClick(user._id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
