import React,{useState, useEffect} from "react";
import "./login.css";
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";
function Login() {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
     function LoginAPI(e){
      e.preventDefault();
      if(email===""){
        alert("Please Enter Email Id ");
        return;
      }
      if(password===""){
        alert("Please Enter Password ")
        return;
      }

      async function getData()
        {
            const res = await axios.post("http://localhost:8081/login",{
                email : email,
                password : password
            });
            console.log(res.data.data);
           
            if(res.data.status===200){
              localStorage.setItem('user_status',true);
              localStorage.setItem('user_id',res.data.data.id);
              localStorage.setItem('user_id_name',res.data.data.name);
              localStorage.setItem('user_id_email',res.data.data.email);
              const user_status=localStorage.getItem('user_status');
              console.log('user_status',user_status);
               return <Redirect to='/'  />
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
        <div className="sub-title">Login</div>
        <form>
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
          <div className="submit-btn">
            <Link to="/" >
          <button type="submit" className="btn btn-primary" onClick={LoginAPI} >
            Submit
          </button>
          </Link>
          </div>
          <div className="new-user">
            <Link to="/Register" >New user ? Register here</Link>
          </div>
        </form>
      </div>
      </div>
    
  );
}

export default Login;
