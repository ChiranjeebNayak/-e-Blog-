import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Blogcard from "../blogcard/Blogcard";


function Blogs() {
  localStorage.setItem('user_id',14)
const userId=parseInt(localStorage.getItem('user_id'));
const [posts,setPosts] = useState([]);
useEffect(()=>{
  fetch("http://localhost:8081/post/all").then((result) => {
  result.json().then((resp) => {
    // console.log("result = ",resp.data);
    // posts=resp.data;
    setPosts(resp.data);
  })
})
},[])
console.log(posts);
  return (
    <div>
      <Navbar></Navbar>
      <div className="row">
        {posts.map((item) => 
          item.user_id===userId ?
          <Blogcard title={item.title} contect={item.content} key={item.id} />:null
        )}
      </div>
    </div>
  );
}

export default Blogs;
