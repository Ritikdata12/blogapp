import React, { useEffect, useState } from 'react'

import "./Posts.css";
import Navbar from '../component/Navbar';



const Posts = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3001/get_blog');
            const data = await response.json();
            setUsers(data);
          } catch (error) {
            setError(error);
          }
        };
    
        fetchData();
      }, []);
    
      
      const handleSearch = () => {
        // Filter users based on searchTerm, handling potential undefined values
        setUsers(
          users.filter((user) => {
            return (
              user.title &&
              user.email &&
              user.category &&
              (
                user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.category.toLowerCase().includes(searchTerm.toLowerCase())
              )
            );
          })
        );
      };

  return (
   <>
   <Navbar/>
    <input
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className='input111'
  placeholder="Search by name, email, or message"
/>

    <button onClick={handleSearch} className='button'>Search</button>

<table className="table">
  <thead>
    <tr>
      <th className="th">Title</th>
      <th className="th">user email_id</th>
      <th className="th">File</th>
      <th className="th">Category </th>
      <th className="th">Description</th>

    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user._id}> {/* Provide a unique key for each row */}
      {/* <td>{user._id}</td> */}
        <td>{user.title}</td>
        <td>{user.email}</td>
        <td><img src={`http://localhost:3001/Images/${user.file}`} className='images' alt={user.title} /></td>
        <td>{user.category}</td>
        <td>{user.desc}</td>


      </tr>
    ))}
  </tbody>
</table>
   </>
  )
}

export default Posts