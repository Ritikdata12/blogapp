import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

import "./Register.css";

const Usercreate = () => {
  const [name, setname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [file, setfile] = useState(null);
  const[gender,setgender] = useState('');

  const navigate = useNavigate(); // Get history/navigation methods

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('file', file);
    formData.append('email', email); // Accessing email from context
    formData.append('username', username);

    axios.post('http://localhost:3001/userprofile', formData)
      .then((res) => {
        console.log(res.data);

       if(res.data.status==='success'){
        navigate("/");
       }
       else{
        console.log("err");

       }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Navbar />
      <div className="div1">
        <div className="div2">
          <h2 className="h2">Sign Up</h2>
          <form onSubmit={handleSubmit}>

          <div>
              <label htmlFor="name" className="label1">Name</label><br />
              <input
                id="username"
                className="input1"
                type="text"
                placeholder="Enter name"
                onChange={(e) => setname(e.target.value)}
              />
            </div>


            <div>
              <label htmlFor="username" className="label1">Username</label><br />
              <input
                id="username"
                className="input1"
                type="text"
                placeholder="Enter name"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email" className="label1">Email</label><br />
              <input
                id="email"
                className="input1"
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label htmlFor="email" className="label1">Select Gender</label><br />


            <div className="custom-select1">
              <select className="select1" onChange={(e) => setgender(e.target.value)}>
                <option value="" className="select-selected">Select Gender</option>
                <option value="Male" className="select-selected">Male</option>
                <option value="Female" className="select-selected">Female</option>
              </select>
            </div>


            <input
              type='file'
              className='file'
              placeholder='Select file'
              onChange={(e) => setfile(e.target.files[0])}
            />

          
            <button className="signup_btn">Submit</button>
          </form>

        
         
        </div>
      </div>
    </>
  );
};

export default Usercreate;
