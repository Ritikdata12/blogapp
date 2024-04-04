import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../App'
import { IoMdMenu } from "react-icons/io";
import axios from "axios";
import logo from "../images/blog_logo.png";


import "./Navbar.css";

const Navbar = () => {
  const user = useContext(userContext);
  const navigate = useNavigate();
  /*
  Here first in login page session store my email
  then here for login email get current-user
  then we authenticate all thing
  */

  const handlelogout = () => {
    axios.get('http://localhost:3001/logout')
    .then(response => {
        // console.log(response.data); // Expected: "success"
        window.location.href ="/";
    })
    .catch(err => {
        console.log(err);
    });

  };



  
  // console.log('User:', user);
  // console.log(user.username);



  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    // Perform navigation based on the selected option
    if (event.target.value === 'userprofiledata') {
      navigate('/userprofiledata');
    } else if (event.target.value === 'Loginusers') {
      navigate('/Loginusers');
    }
    else if(event.target.value ==='contacts'){
      navigate("/contacts")
    }
    else if(event.target.value ==='postsusers'){
      navigate("/postsusers");
    }
   
  };

  return (
    <>
     <header>
      <div className="head">
      <Link to="/"><img src={logo} className="himg" alt=""/></Link>

        <nav className="navbar">
  <Link className="link" to="/">Home</Link>
  {
              user.email ?
            <Link to="/create" className='link'>Create</Link>
              :<></>
            }
  <Link className="link" to="/ContactUs">Contactus</Link>

<Link>
  {
  user.email === "admin@gmail.com" ? (
    <div className="custom-select">
    <select className="select" value={selectedValue} onChange={handleSelectChange}>
      <option value="" className="select-selected">Select role</option>
      <option value="userprofiledata" className="select-selected">userprofiledata</option>
      <option value="Loginusers" className="select-selected">Login users</option>
      <option value="contacts" className="select-selected">Contacts list</option>
      <option value="postsusers" className="select-selected">posts</option>

    </select>
  </div>
  ) : (
    <></>
  )
}
</Link>

  <Link className='link'>
{
        user.email? (
        <div className='position'>
          <input
            type="button"
            onClick={handlelogout}
            value="Logout"
            className="btn_input"
          />
        </div>
      ) : (
        <div className='position'>
          <h3 className='h3'>
            <Link to="/Register" className="links">
              Register/Login
            </Link>
          </h3>
        </div>
        
      )
      }
      </Link>
</nav>


        <div className="dropdown">
          <IoMdMenu style={{ fontSize: '25px', cursor: 'pointer', marginRight: '10px', marginTop: '26px' }}/>
           <div className="dropdown-content">
           <Link className="link" to="/">Home</Link>
           {
              user.username ?
            <Link to="/create" className='link'>Create</Link>
              :<></>
            }
  <Link className="link" to="/ContactUs">Contactus</Link>
  <Link className= "link">
  {
        user.username? (
        <div className='position'>
          <input
            type="button"
            onClick={handlelogout}
            value="Logout"
            className="btn_input"
          />
        </div>
      ) : (
        <div className='position'>
          <h3 className='h3'>
            <Link to="/Register" className="links">
              Register/Login
            </Link>
          </h3>
        </div>
        
      )
      }
      </Link>

   
          </div> 
        </div>
      </div>

      <div className='app'></div>
      
    </header>
    </>
  )
}

export default Navbar