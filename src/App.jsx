import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  useParams
} from "react-router-dom";
import { useState, useEffect } from 'react';
import Homepage from './components/homepage/Homepage';
import Login from'./components/login/Login.jsx';
import Register from "./components/Register/Register";
import Navbar from './components/navbar/Navbar';
import Blogs from './components/blogs/Blogs';
import Write from './components/write/Write';
import Viewpost from './components/viewpost/Viewpost';
import Editpost from './components/editpost/Editpost';


function App() {
  //const currentUser=localStorage.getItem('user_status');
  //console.log(currentUser);
  let currentUser=localStorage.getItem('user_status');
  return (
    <Router>
    
        <Route exact path="/">
        {currentUser ? <Homepage /> : <Login />}
        </Route>
        <Route  path="/Register">
          <Register />
        </Route>
        <Route  path="/Blogs">
        <Blogs />
        </Route>
        <Route  path="/Write">
        <Write />
        </Route>
        <Route  path="/Viewpost/:postid">
        <Viewpost />
        </Route>
        <Route  path="/Editpost/:postid">
        <Editpost />
        </Route>
      
    </Router>
  );
}

export default App;
