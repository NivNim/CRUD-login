import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="left-nav">
        <Link to="/">Home</Link>
      </div>
      <div className="right-nav">
        <Link to="/add-user">Add User</Link>
        <button>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
