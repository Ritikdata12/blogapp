import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import "./Blog.css";

const Blog = () => {
  
  const notify = () => toast.success('Post deleted successfully', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const notify1 = () => toast.success('comment added successfully', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });


  const user = useContext(userContext);
  const { id } = useParams();
  const [Blog, setblog] = useState('');
  const[comments,setcomments] = useState('');
  const [userComments, setUserComments] = useState([]); // State to store user comments
    const navigate = useNavigate();

    console.log(user.email);
    console.log(Blog.email);
    
  const handledelete = (id) => {
    axios.delete(`http://localhost:3001/deletepost/${id}`)
      .then((result) => {
        notify();
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      })
      .catch(err => console.log(err));
  }



  useEffect(() => {
    axios.get(`http://localhost:3001/getpostbyid/${id}`)
      .then(result => {
        console.log(result.data); 
        setblog(result.data);
        
        axios.get(`http://localhost:3001/comments/${id}`) // Fetch comments for specific post
      .then((result) => {
        
        console.log(result.data); 
        setUserComments(result.data); // Store comments in state
      })
      .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

  }, [id]);

  const handlesubmit = () => {
    if (!user.email) {
      alert('Please login or register to comment.'); // Show alert message if user is not logged in or registered
      return;
    }

    axios.post(`http://localhost:3001/comments`, { userEmail: user.email, comments: comments, postId: id })
      .then((result) => {
        if (result.data.status === 'success') {
          console.log("success");
          // Clear input field after successful submission
          setcomments('');
  
          // Fetch updated comments after submission and update state
          axios.get(`http://localhost:3001/comments/${id}`)
            .then(commentsResult => {
              notify1();
              setTimeout(() => {
                // console.log(commentsResult.data);
              setUserComments(commentsResult.data); // Update userComments state with new comments
              }, 1500);
            
            })
            .catch(err => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
    <div className='post_container'>
      <div className="post_post">
      <h2 className="title">Title:  {Blog.title}</h2>
      <h2 className='category'>Category:  {Blog.category}</h2>
        {Blog.file && <img src={`http://localhost:3001/Images/${Blog.file}`} alt=" " />}
        <p className='desc'>{Blog.desc}</p>
        
        {user.email === Blog.email || user.email === "admin@gmail.com" ? (
  <div className="button-container">
    <Link to={`/editpost/${Blog._id}`} className="edit-button">Edit</Link>
    <button onClick={(e) => handledelete(Blog._id)} className="delete-button">Delete</button>
  </div>
) : (
  <>
  </>
)}

<br/>
<br/>
<br/>
<br/>

<div class="comment-box">
  <textarea class="comment-input" placeholder="Write a comment..." value={comments} onChange={(e) => setcomments(e.target.value)}></textarea>
  <button class="comment-btn" onClick={handlesubmit}>Submit</button>
</div>

        
          <ToastContainer/>
      </div>
    </div>

    <div className="user-comments-container">
  <h3 className="user-comments-title">User Comments:</h3>
  <ul className="user-comments-list">
    {userComments.map(comment => (
      <li class="user-comment" key={comment._id}>
        <span className="user-email">{comment.userEmail}:</span>
        <span className="comment-text">{comment.comments}</span>
        <br/>
        <span className="comment-date">Posted on: {new Date(comment.createdAt).toLocaleDateString()}</span>
      </li>
    ))}
  </ul>
</div>

    </>
  );
};


export default Blog;
