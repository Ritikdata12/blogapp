import React, { useEffect, useState } from 'react'

import "./Contacts.css";
import Navbar from '../component/Navbar';

const Contacts = () => {
    const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/get_contactus');
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
          user.name &&
          user.email &&
          user.message &&
          (
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.message.toLowerCase().includes(searchTerm.toLowerCase())
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
            <th className="th">username</th>
            <th className="th">user email_id</th>
            <th className="th">User Messages</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>  {/* No extra spaces here */}
              <td>{user.email}</td>  {/* No extra spaces here */}
              <td>{user.message}</td> {/* No extra spaces here */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Contacts