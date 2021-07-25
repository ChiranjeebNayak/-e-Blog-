import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { useEffect } from "react";
import './viewpost.css'
import { Redirect } from "react-router";
import { Link ,Route} from "react-router-dom";


function Viewpost() {

  const url = window.location.href;
  const urlarray = url.split("/");
  const postid = urlarray[urlarray.length - 1];

  localStorage.setItem('user_id',14)//static user
  localStorage.setItem('user_id_name',"Chiranjeeb Nayak")//static user

  const userId = localStorage.getItem("user_id");
  const name = localStorage.getItem("user_id_name");
  
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
 // console.log(posts);


/*********************** create comment API Call *************************/

  const [comment, setComment] = useState("");

  function createCommentAPI(e) {
    e.preventDefault();

    if (comment === "") {
      return alert("Enter your Coment");
    }

    async function CommentAPI() {
      const res = await axios.post("http://localhost:8081/comment/create", {
        user_id: userId,
        post_id: postid,
        comment: comment,
        name: name
      });
      console.log(res.data);
      if (res.data.status === 200) {
        alert(res.data.data);
      } else {
        alert(res.data.data);
      }
    }
    CommentAPI();
  }





/*********************** create comment API Call *************************/



/*********************** Get comment API Call *************************/

const [allcomments,setAllcomments]=useState([]);

function showCommentAPI(e) {
   e.preventDefault();
    async function userCommentAPI() {
      const res = await axios.get(`http://localhost:8081/comment/${postid}`);
      console.log(res.data);
      if (res.data.status === 200) {
        console.log(res.data.comments);
        setAllcomments(res.data.comments);
      } else {
        alert(res.data.data);
      }
    }
    userCommentAPI();
  }
  

/*********************** Get comment API Call *************************/



/*********************** Delete Post API Call *************************/


function deletePostAPI(e) {
    e.preventDefault();
     async function DeletePostAPI() {
       const res = await axios.delete(`http://localhost:8081/delete/${postid}`);

       if (res.data.status === 200) {
         alert("Post Deleted");
         <Route exact path="/">
         <Redirect to="/dashboard" />
       </Route>
       } else {
         alert(res.data.data);

       }
     }
     DeletePostAPI();
   }
   







/*********************** Delete Post API Call *************************/
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
      {posts.map((item,i) => 
          item.id===parseInt(postid)?
          (<div key={i}>
            <div className="post-image" >
            <img
              src="https://source.unsplash.com/1600x300?blog"
              className="img-fluid"
              alt="Homepage image"
            />
          </div>
          <div className="opration">
          <Link to={{
                  pathname: `/Editpost/${postid}`
                }}>
          <button htmlFor="edit" className="btn  btn-info edit" >Edit</button>
          </Link>
          <Link to="/Blogs">
          <button htmlFor="delete" className="btn btn-danger delete" onClick={deletePostAPI}>Delete</button>
          </Link>
          </div>
          <div className="title "   >
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
        <label htmlFor="content" class="form-label">
              Comment
            </label>

{
    allcomments.map((item,i) =>

            <div className="user-comment">
                <div className="username">
                {item.name}
            </div>
            <div className="commenttext">
                {item.comment}
            </div>
        </div>
        

    )
}
</div>

        <form>
          <div class="mb-3">
            
            <textarea
              class="form-control"
              id="content"
              rows="3"
              placeholder="Write your Comment"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={createCommentAPI}
          >
            Post Comment
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={showCommentAPI}
            style={{margin:"20px"}}
          >
            Show All Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Viewpost;
