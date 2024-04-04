import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edituserprofile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const { id } = useParams();

  const notify = () =>
    toast.success('Profile edited successfully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    if (file) {
      formData.append('file', file);
    }

    axios
      .put(`http://localhost:3001/edituser/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        console.log(result);
        if (result.data.status === 'success') {
          notify();
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        } else {
          toast.error('Something went wrong. Profile not updated successfully', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/userprofiledata/${id}`)
      .then((response) => {
        const { name, username, email, file } = response.data;
        setName(name);
        setUsername(username);
        setEmail(email);
        setFile(file); // Update this line
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="post_container">
        <div className="post_form">
          <form onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <input
              type="text"
              placeholder="Enter name"
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter username"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter email"
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)}
            />
            {file && (
              <input
                type="file"
                className="file"
                placeholder="Select file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            )}
            <button>Update</button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Edituserprofile;
