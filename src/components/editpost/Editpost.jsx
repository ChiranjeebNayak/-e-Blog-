import React, {  useState,useEffect } from "react";
import Navbar from "../navbar/Navbar";
import "./editpost.css";
import { Link } from "react-router-dom";
import axios from "axios";


function Editpost() {


    const[title,setTitle]=useState("")
    const[content,setContent]=useState("")
    const[image,setImage]=useState("")
    
    const userId=localStorage.getItem('user_id');

    const url = window.location.href;
    const urlarray = url.split("/");
    const postid = urlarray[urlarray.length - 1];


    const [posts,setPosts] = useState([]);
    useEffect(()=>{
    fetch("http://localhost:8081/post/all").then((result) => {
    result.json().then((resp) => {
        setPosts(resp.data);
    })
    })
    },[])

console.log(posts);

    
async function EditAPI(e)
    {e.preventDefault()
        const res = await axios.put("http://localhost:8081/post/edit",{
            title : title,
            content : content,
            user_id : userId,
            image:image
        });
        console.log(res.data);
        if(res.data.status===200){
          alert(res.data.data);
        }
        else{
          alert(res.data.data);
        }  
    }

  return (
    <div>
      <Navbar></Navbar>
      <div className="container-fluid">
        <form>
          <div class="mb-3">
            <label htmlFor="formFile" class="form-label">
              Image
            </label>
            {/* <input class="form-control" type="file" id="formFile" onChange={(e)=>setImage(e.target.value)} /> */}
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            {posts.map((item,i) => 
          item.id===parseInt(postid)?
          (<div key={i}>
            <input
            type="text"
            className="form-control"
            id="titleInput"
            defaultValue={item.title}
            onChange={(e)=>setTitle(e.target.value)} 
            >
            </input>
            <div class="mb-3">
            <label htmlFor="content" class="form-label">
              Content
            </label>
            <textarea
              class="form-control"
              id="content"
              rows="6"
              defaultValue={item.content}
              onChange={(e)=>setContent(e.target.value)}  
            ></textarea>
          </div>
        </div>
          ) 
          
          : null 
          
        )}
            
          </div>
          
          <Link to="/Blogs">
          <button type="submit" className="btn btn-primary" onClick={EditAPI}>
            Update
          </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Editpost;
