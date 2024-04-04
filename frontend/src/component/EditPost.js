import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null); // Set initial value to null
  const { id } = useParams();

  const notify = () => toast.success('Post edited successfully', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const handlesubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    if (file) {
      formData.append('file', file);
    }

    axios.put(`http://localhost:3001/editpost/${id}`, formData)
      .then(result => {
        console.log(result);
        if (result.data.status === "success") {
          notify();
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        } else {
          toast.error('Something went wrong. Please try again later', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get("http://localhost:3001/getpostbyid/" + id)
      .then(post => {
        setTitle(post.data.title);
        setDesc(post.data.desc);
        setFile(post.data.file || null); // Provide a default value if file is null or undefined
      })
      .catch(err => console.log(err));
  }, [id]); // Add id to the dependency array

  return (
    <>
      <Navbar />
      <div className='post_container'>
        <div className='post_form'>
          <form onSubmit={handlesubmit} encType="multipart/form-data"> {/* Set encType to "multipart/form-data" */}
            <h2>Edit post</h2>
            <input
              type="text"
              placeholder='Enter title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="10"
              placeholder="Enter Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <input
              type="file"
              className="file"
              placeholder='Select file'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button>Update</button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default EditPost;
