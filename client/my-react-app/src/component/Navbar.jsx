import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (  
    <nav className="navbar">
      <div className="container">
        <div className="left-nav">
          <Link to="/" className="nav-link">Home</Link>
        </div>
        <div className="right-nav">
          <Link to="/AddUser" className="nav-link">Add</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
