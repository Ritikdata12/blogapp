// // ContactUs.js

// import React, { useState } from 'react';
// import Navbar from './Navbar';
// import axios from 'axios';
// import { Link, Navigate, useNavigate } from 'react-router-dom'

// import "./ContactUs.css";

// const ContactUs = () => {
//   const navigate = useNavigate();
//   const [email,setemail] = useState('');
//   const[name,setname] = useState('');
//   const[message, setmessage] = useState('');

//   const handlesubmit =(e)=>{
//     e.preventDefault();

//     axios.post("http://localhost:3001/contactus", {email,name,message})
//     .then(result =>{
//       console.log(result);
//       if(result.data.status ==="success"){
//        console.log(result)
//        window.location.href="/";
//     }
//     // else{
//     //     navigate("/")
//     // }
//     })
//     .catch(err => console.log(err));
//   }

     
  

//   return (
//     <>
//     <Navbar/>
//     <div className="contact-container">
//       <h1>Contact Us</h1>
//       <p>If you have any questions or feedback, feel free to get in touch with us.</p>
//       <div className="contact-form">
//         <input type="text" placeholder="Your Name"
//         onChange={(e)=> setname(e.target.value)}
//         />
//         <input type="email" placeholder="Your Email"
//         onChange={(e)=> setemail(e.target.value)}
//         />
//         <textarea placeholder="Your Message"
//         onChange={(e)=> setmessage(e.target.value)}
//         ></textarea>
//         <button onClick={handlesubmit}>Send Message</button>
//       </div>
//     </div>
//     </>
//   );
// };

// export default ContactUs;

import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import "./ContactUs.css";

const ContactUs = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform client-side validation (optional)
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Validate other fields if needed

    try {
      const response = await axios.post('http://localhost:3001/contactus', {
        email,
        name,
        message,
      });

      if (response.data.status === 'success') {
        console.log('Message sent successfully:', response.data.message);
        navigate('/'); // Redirect to homepage on success
        alert('Your message has been sent successfully!');
      } else {
        console.error('Error sending message:', response.data.error);
        alert('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  // Email validation function (optional)
  const isValidEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>If you have any questions or feedback, feel free to get in touch with us.</p>
        <div className="contact-form">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button onClick={handleSubmit}>Send Message</button>
        </div>
      </div>
    </>
  );
};

export default ContactUs;

