import React, {  useState } from "react";
import Navbar from "../navbar/Navbar";
import "./write.css";
import axios from "axios";


function Write() {
    const[title,setTitle]=useState("")
    const[content,setContent]=useState("")
    const[image,setImage]=useState("")
    const userId=14;
    async function CreateAPI(e)
    {e.preventDefault()
        const res = await axios.post("http://localhost:8081/post/create",{
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
            <input
              type="text"
              className="form-control"
              id="titleInput"
              onChange={(e)=>setTitle(e.target.value)} 
            />
          </div>
          <div class="mb-3">
            <label htmlFor="content" class="form-label">
              Content
            </label>
            <textarea
              class="form-control"
              id="content"
              rows="6"
              onChange={(e)=>setContent(e.target.value)}  
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" onClick={CreateAPI}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Write;
