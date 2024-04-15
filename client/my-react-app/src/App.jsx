import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Navbar from './component/Navbar.jsx';
import AddUser from './component/AddUser.jsx';
 

import LoginForm from './component/LoginForm.jsx';
import Home from './component/Home.jsx';
import RegisterForm from './component/RegisterForm.jsx';

axios.defaults.baseURL="http://localhost:3000";

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [showLogin, setShowLogin] = useState(true); 
  const [editMode, setEditMode] = useState(false); 
  const [userIdToEdit, setUserIdToEdit] = useState(null); 

  // useEffect(() => {
  //   fetchAllUsers();
  // }, []);



  // const deleteUser = async (userId) => {
  //   try {
  //     await axios.delete(`/api/delete/${userId}`);
  //     fetchAllUsers();
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //   }
  // };

  // const editUser = async () => {
  //   try {
  //     await axios.put(`/api/update/${userIdToEdit}`, { name, email, password });
  //     fetchAllUsers();
  //     setEditMode(false);
  //     setUserIdToEdit(null);
  //     setName('');
  //     setEmail('');
  //     setPassword('');
  //   } catch (error) {
  //     console.error('Error updating user:', error);
  //   }
  // };



  // const fetchAllUsers = async () => {
  //   try {
  //     const response = await axios.get('/api/users');
  //     setUsers(response.data);
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // };

  const handleEditClick = (userId) => {
    const userToEdit = users.find(user => user._id === userId);
    if (userToEdit) {
      setEditMode(true);
      setUserIdToEdit(userId);
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setPassword('');
    }
  };

const router=createBrowserRouter([
  {path:'/',
element:<LoginForm/>},
{path:'/home',
element:<Home/>},
{path:'/addUser',
element:<AddUser/>},
{path:'/register',
element:<RegisterForm/>},
{path:'/login',
element:<RegisterForm/>}
])


  return (

<>
<RouterProvider router={router}/>
</>
  );
}

export default App;
