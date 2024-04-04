import React, { useContext } from 'react'
import { userContext } from '../App'
import { Navigate, useNavigate } from 'react-router-dom';

const Admin = () => {
    const user = useContext(userContext);
    const navigate = useNavigate();

    console.log(user);
  return (
    <div>Admin</div>
  )
}

export default Admin