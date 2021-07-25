import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";


function Navbar() {
  const user_name=localStorage.getItem("user_id_name");
  function Logout(){
    alert("logout");
    localStorage.removeItem('user_status');
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <Link to="/">
          <div className="navbar-brand">
            <span style={{ color: "blue" }}>[</span>
            <span style={{ color: "orange" }}>e</span>
            <span style={{ color: "blue" }}>]</span> BLOG
          </div>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/Blogs">
                Blogs
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/Write">
                Write
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/" onClick={Logout}>
                Logout
              </Link>
              
            </li>
          </ul>
          <div>
            Hello, {user_name}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
