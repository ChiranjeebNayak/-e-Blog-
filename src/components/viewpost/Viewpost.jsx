import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { useEffect } from "react";
import './viewpost.css'




function Viewpost() {
  const url = window.location.href;
  const urlarray = url.split("/");
  const postid = urlarray[urlarray.length - 1];
  const [post, setPost] = useState([]);

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

//   function postDetailsAPI() {
//     //e.preventDefault();
//     // async function getPostDetails() {
//     //   const res = await axios.get("http://localhost:8081/post/postid", {
//     //     post_id:"3"
//     //   });
//     //   console.log(postid + " " + res.data.data);

//     //   if (res.data.status === 200) {
//     //     alert("res = "+ res.data.data);
//     //     // alert(post);
//     //   } else {
//     //     alert(res.data.data);
//     //   }
//     // }
//     // getPostDetails();

//     // async function getData()
//     // {
//     //     const res = await axios.get("http://localhost:8081/post/postid",{
//     //         post_id : "3"
//     //     });
//     //     console.log(res.data.data);  
//     // }
//     // getData();


//   }
//   postDetailsAPI();

  const [comment, setComment] = useState("");

  function createCommentAPI(e) {
    e.preventDefault();
    alert("start create comment", comment);
    if (comment === "") {
      return alert("Enter your Coment");
    }

    const userId = localStorage.getItem("user_id");
    const name = localStorage.getItem("user_id_name");
    async function CommentAPI(e) {
      const res = await axios.post("http://localhost:8081/post/create", {
        userId: userId,
        postId: postid,
        comment: comment,
        name: name,
      });
      console.log(res.data);
      if (res.data.status === 200) {
        alert(res.data.data);
      } else {
        alert(res.data.data);
      }
    }
  }


const [allcomments,setAllcomments]=useState([]);

function createCommentAPI(e) {
    e.preventDefault();
    alert("start create comment", comment);
    if (comment === "") {
      return alert("Enter your Coment");
    }

    const userId = localStorage.getItem("user_id");
    const name = localStorage.getItem("user_id_name");

    
    
  }
  async function getCommentAPI() {
    
    const res = await axios.get("http://localhost:8081/comment/all", {
      postId: postid
    });
    console.log(res.data);
    if (res.data.status === 200) {
      console.log("comments data = "+res.data.data);
    } else {
      alert(res.data.data);
    }
  }
  getCommentAPI();
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
      {posts.map((item,i) => 
          item.id===15?
          (<div key={i}>
            <div className="post-image" >
            <img
              src="https://source.unsplash.com/1600x300?blog"
              className="img-fluid"
              alt="Homepage image"
            />
          </div>
          <div className="title mb-1">
          <label htmlFor="title" className="form-label">
            {item.title}
          </label>
        </div>
        <div className="content">{item.content}</div>
        </div>
          ) 
          
          : null 
          
        )}
        <div className="comment">
            <span>Comments</span>
            <div className="user-comment">
                <div className="username">
                User Name
            </div>
            <div className="commenttext">
                Nice BLog
            </div>
        </div>
        </div>
        <form>
          <div class="mb-3">
            <label htmlFor="content" class="form-label">
              Comment
            </label>
            <textarea
              class="form-control"
              id="content"
              rows="3"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={createCommentAPI}
          >
            Submit
          </button> 
          
        </form>
      </div>
    </div>
  );
}

export default Viewpost;
