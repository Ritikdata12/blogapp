import React,{useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import axios from 'axios'
import "./Login.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const notify = () => toast.success('Login successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });


    const[email,setemail] = useState('');
    const[password,setpassword] = useState('');
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
      
        axios.post("http://localhost:3001/login", { email, password })
          .then(result => {
            // console.log(result);
            if (result.data.status === "success") {
              notify();
              setTimeout(() => {
                window.location.href = "/";
              }, 1500);
            } else {
              toast.error('Incorrect email or password', {
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

      
  return (
    <>
    <Navbar/>
    <div className='signup_container'>
    <div className='sign'>
        <h2 className='login'>Login</h2>
        <form onSubmit={handlesubmit}>
            <div>
            <label className="label" htmlFor='email'>Email</label><br/>
            <br/>
                <input  className="input" type='email' placeholder='enter email'
                onChange={(e) => setemail(e.target.value)}
                />
                <br/>
                <br/>
            </div>

            <div>
            <label className="label" htmlFor='password'>password</label><br/>
                <input className='input' type='password' placeholder='enter password'
                onChange={(e) => setpassword(e.target.value)}
                />
            </div>
            <button className='signup_btn'>login</button>
            <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>

        </form>

        <br></br>
        <p className='p'>Already have an account?</p>
        <Link to ="/Register">   
        <button className='signup_btn'>
             Sign up
             </button>
             </Link>
    </div>
</div>
</>
  )
}

export default Login