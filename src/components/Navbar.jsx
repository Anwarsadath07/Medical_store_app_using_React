import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn,  setIsLoggedIn } = useContext(UserContext);

  const handleLogout = () => {
  
    setIsLoggedIn(false);
    navigate("/");
    console.log('USer logged out');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mt-2">
      <div className="container">
        <Link className="navbar-brand fw-bolder"  to="/">Medical Store</Link>
        {isLoggedIn && (
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
