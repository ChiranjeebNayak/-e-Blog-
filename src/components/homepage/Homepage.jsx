import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Blogcard from "../blogcard/Blogcard";
import "./homepage.css";
import axios from "axios";

function Homepage() {
  const staticposts = [
    { id:1,
      title:"This a  title",
      content:"This a content"
    },
    { id:2,
      title:"This a  title",
      content:"This a content"
    },
    { id:3,
      title:"This a  title",
      content:"This a content"
    },
    { id:4,
      title:"This a  title",
      content:"This a content"
    },
  ]
 

const [posts,setPosts] = useState([]);
useEffect(()=>{
  fetch("http://localhost:8081/post/all").then((result) => {
  result.json().then((resp) => {
    setPosts(resp.data);
  })
})
},[])
console.log(posts);
  return (
    <>
      <Navbar></Navbar>
      <div className="conatiner-fluid bg-dark">
        <div className="Homepage-image">
          <img
            src="https://source.unsplash.com/1024x900?blog"
            className="img-fluid"
            alt="Homepage image"
          />
          <h2 className="centered">welcome to [e] blog</h2>
        </div>
        <div className="row">
          {
            
            posts.map((item)=>
            <Blogcard title={item.title} content={item.content} postid={item.id}/>)
          } 
        </div>
      </div>
    </>
  );
}

export default Homepage;
