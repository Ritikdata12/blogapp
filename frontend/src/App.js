// import './style.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './component/Login';
import Navbar from './component/Navbar';
import Register from './component/Register';
import Home from './component/Home';
import { useEffect, useState } from 'react';
import axios from 'axios';

// here we create redux functionality
import { createContext } from 'react';

import Create from './component/Create';
import Blog from './component/Blog';
import EditPost from './component/EditPost';
import ContactUs from './component/ContactUs';
import Apidata from './component/apidata';
import Posts from './middleware/Posts';
import Contacts from './middleware/Contacts';
import Loginusers from './middleware/Loginusers';
import Usercreate from './component/Usercreate';
import Userprofiledata from './middleware/Userprofiledata';
import Userprofile from './component/Userprofile';
import Edituserprofile from './component/Edituserprofile';


export const userContext = createContext();

function App() {
  const[user,setuser] = useState([]);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(user => {
        const userData = user.data;
        setuser(userData); // Update the user state
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  
  

  return (    

    <userContext.Provider value={user}>
     <Router>
        <Routes>
      <Route path="/Navbar" element={<Navbar/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/blogapp" element={<Home/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/Create" element={<Create/>}/>
      <Route path="/Blog/:id" element={<Blog/>}/>
      <Route path="/editpost/:id" element={<EditPost/>}/>
      <Route path="/ContactUs" element={<ContactUs/>}/>
      <Route path="/apidata" element={<Apidata/>}/>
      <Route path="/postsusers" element={<Posts/>}/>
      <Route path='/contacts' element={<Contacts/>}/>
      <Route path='/Loginusers' element={<Loginusers/>}/>
      <Route path='/usercreate' element={<Usercreate/>}/>
      <Route path='/userprofiledata' element={<Userprofiledata/>}/>
      <Route path='/userprofile/:id' element={<Userprofile/>}/>
      <Route path='/edituser/:id' element={<Edituserprofile/>}/>
        </Routes> 
     </Router>
     </userContext.Provider>
  );
}

export default App;
