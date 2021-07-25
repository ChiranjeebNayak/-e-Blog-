import React from 'react'
import { Link } from 'react-router-dom';
import bgimg from "../../assets/images/hompageimg1.jpg";
import Viewpost from '../viewpost/Viewpost';
import './blogcard.css'

function Blogcard(props) {
  
    return (
          <div className="col-md-3 col-sm-6">
            <div className="card" style={{width: "18rem"}}>
              <img src={bgimg} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">
                  {props.content}
                </p>
                <Link  className="btn btn-primary" 
                to={{
                  pathname: `/Viewpost/${props.postid}`,state: { id: 7, color: 'green' }
                }}
                
                >
                  View Post
                </Link>
              </div>
            </div>
          </div>
    );
}

export default Blogcard
