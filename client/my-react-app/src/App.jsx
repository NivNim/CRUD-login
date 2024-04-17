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
