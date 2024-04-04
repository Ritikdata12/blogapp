import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../App'
import { Navigate } from 'react-router-dom';
import "./Userprofile.css";
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Userprofile = () => {
  const user = useContext(userContext);
  const navigate = useNavigate()
  const { id } = useParams();
  const [blog, setBlog] = useState(null); // Changed to null instead of undefined
  
  const notify = () => toast.success('Post added successfully', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

   useEffect(() => {
    axios.get(`http://localhost:3001/userprofiledata/${id}`)
      .then(result => {
        console.log(result.data); // Check if you're receiving the correct data
        setBlog(result.data);
      })
      .catch(err => console.log(err));
  }, [id]);
  console.log(id);


    
  const handledelete = (id) => {
    axios.delete(`http://localhost:3001/deleteuser/${id}`)
      .then(result => navigate("/"))
      .catch(err => console.log(err));
  }


  


  if (!blog) { // Changed to check for blog instead of Blog
    return <div>Product not found</div>;
  }

  return (
    <>
   <Navbar/>

    
<div className="card">
{blog.file && <img src={`http://localhost:3001/Images/${blog.file}`} className="card1" alt=" " />}
  <h1>Name: {blog.name}</h1>
  <p className="title">Username: {blog.username}</p>
  <p> email id: {blog.email}</p>
  
  <Link to={`/edituser/${blog._id}`} className="edit-button">Edit</Link>

  
  <button  onClick={(e) => handledelete(blog._id)} >delete</button>
</div>


    </>
  );
};

export default Userprofile;
