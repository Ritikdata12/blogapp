import React, { useState, useContext } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Create.css';

const Create = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState('black');
  const [category, setCategory] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);

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

  const navigate = useNavigate();
  const user = useContext(userContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !desc) {
      if (!title) setTitleError(true);
      if (!desc) setDescError(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('file', file);
    formData.append('category', category);
    formData.append('email', user.email);
    formData.append('username', user.username);

    axios.post('http://localhost:3001/create', formData)
      .then((result) => {
        if (result.data.status === 'success') {
          notify();
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        } else {
          toast.error('Something went wrong. Post not added successfully', {
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
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className='post_container'>
        <div className='post_form'>
          <form onSubmit={handleSubmit}>
            <h2>Create post</h2>
            <input
              type='text'
              placeholder='Enter title'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError(false);
              }}
              onBlur={() => setTitleError(!title)}
              className={titleError ? 'error' : ''}
            />
            {titleError && <div className="error-text">Title is required</div>}
            
            <div className="custom-select1">
              <select className="select1" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select role</option>
                <option value="programming">programming</option>
                <option value="Technology">Technology</option>
                <option value="politics">politics</option>
              </select>
            </div>

            <textarea
              name='desc'
              id='desc'
              cols='30'
              rows='10'
              placeholder='Enter Description'
              style={{ fontSize: fontSize, color: fontColor }}
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
                setDescError(false);
              }}
              onBlur={() => setDescError(!desc)}
              className={descError ? 'error' : ''}
            />
            {descError && <div className="error-text">Description is required</div>}

            <input
              type='file'
              className='file'
              placeholder='Select file'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button>Post</button>
          </form>

          {/* <div>
            <label htmlFor="fontSize">Font Size: </label>
            <input
              type="number"
              id="fontSize"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
            />
          </div> */}
          {/* <div>
            <label htmlFor="fontColor">Font Color: </label>
            <input
              type="color"
              id="fontColor"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
            />

          </div> */}
            <ToastContainer/>

        </div>
      </div>
    </>
  );
};

export default Create;
