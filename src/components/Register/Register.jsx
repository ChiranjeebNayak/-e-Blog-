import React,{useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./register.css";
import { Redirect } from "react-router";

function Register() {
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[repassword,setRepassword]=useState("");

   function RegisterApi(e){
    e.preventDefault();

      if(name===""){
        alert("Please Enter  Name ");
        return;
      }
      if(email===""){
        alert("Please Enter Email Id ");
        return;
      }
      if(password===""){
        alert("Please Enter Password ")
        return;
      }
      
      if(repassword===""){
        alert("Please Enter Re-Password ")
        return;
      }
      if(password!== repassword){
        alert("Password didn't match");
        return;
      }

      async function getData()
        {
            const res = await axios.post("http://localhost:8081/signup",{
                email : email,
                password : password,
                name : name
            });
            console.log(res.data);
            if(res.data.status===200){
              return <Redirect  to="/" />
            }
            else{
              alert(res.data.data);
            }  
        }
        getData();

   }
  return (
    <div className="container-fluid bg-dark">
      <div className="container bg-dark text-light border border-info">
        <div className="title"> <span style={{color:"blue"}}>[</span><span>e</span><span style={{color:"blue"}}>]</span> BLOG</div>
        <div className="sub-title">Sign Up</div>
        <form>
        <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="name" className="form-control" id="name" onChange={(e)=>setName(e.target.value)} />
            </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" onChange={(e)=>setEmail(e.target.value)} />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label  className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label  className="form-label">
              Re-Password
            </label>
            <input
              type="password"
              className="form-control"
              id="repassword"
              onChange={(e)=>setRepassword(e.target.value)}
            />
          </div>
          <div className="submit-btn">
          <button type="submit" className="btn btn-primary" onClick={RegisterApi}>
            Submit
          </button>
          </div>
          <div className="old-user">
            <Link to="/">Already a  user ? Login here</Link>
          </div>
        </form>
      </div>
      </div>
  );
}

export default Register;
