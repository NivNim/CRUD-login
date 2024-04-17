import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./AddUser.css"; 
import AlertDialog from "./Dialogue";

const AddUser = () => {
    const [showBox,setShowBox]=useState(false)
  const [newUser, setNewUser] = useState([]);
  const [id,setId]=useState()
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    mobile: ""
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getAllUsers");
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fun = async () => {
      const res = await fetchData();
      setNewUser(res);
    };
    fun();
  }, [newUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!formValues.name || !formValues.email || !formValues.password || !formValues.mobile) {
        alert("All fields are required.");
        return;
      }
      
      const response = await axios.post("http://localhost:3000/api/adduser", formValues);
      console.log(response.data.message);
      
      setFormValues({
        name: "",
        email: "",
        password: "",
        mobile: ""
      });
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed. Please try again later.");
    }
  };

  const handleRemoveUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/deleteUser/${id}`);
      console.log(`User with id ${id} deleted successfully`);
      const updatedUsers = newUser.filter(user => user._id !== id);
      setNewUser(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again later.");
    }
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  const handleEditUser = async (id) => {
    setShowBox(true)
    setId(id)
  };

const handleClose=()=>{
    setShowBox(false)
}

  const handleEditUsers = async (formValue) => {
    try {
        const response = await axios.put(`http://localhost:3000/api/updateuser/${id}`, formValue);
        console.log(response.data.message);
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user. Please try again later.");
      }
};
  return (
    <div className="center-container">
      <div className="center-content">
        <nav className="navbar">
            <AlertDialog open={showBox} handleClose={handleClose} handleSubmit={handleEditUsers}/>
          <div className="container">
            <div className="left-nav">
              <Link to="/" className="nav-link">Home</Link>
            </div>
            <div className="right-nav">
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </nav>
        <h1 className="page-title">Add User</h1>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {newUser.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.mobile}</td>
                  <td>
                    <button onClick={() => handleEditUser(user._id)}>Edit</button>
                    <button onClick={() => handleRemoveUser(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                  />
                </td>
                <td>
                  <input
                    type="email"
                    name="email" 
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                  />
                </td>
                <td>
                  <input
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="mobile"
                    value={formValues.mobile}
                    onChange={handleChange}
                    placeholder="Enter Mobile"
                  />
                </td>
                <td>
                  <button onClick={handleSubmit}>Add</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
