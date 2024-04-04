import React, { useEffect, useState } from 'react';
import './Loginusers.css';
import Navbar from '../component/Navbar';

const Loginusers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Add searchTerm state

  useEffect(() => {   
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/get_login');
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
          user.username &&
          user.email &&
        //   user.password &&
          (
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) 
            // user.password.toLowerCase().includes(searchTerm.toLowerCase())
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
        placeholder="Search by username, email"
      />

      <button onClick={handleSearch} className='button'>
        Search
      </button>

      <table className="table">
        <thead>
          <tr>
            <th className="th">username</th>
            <th className="th">user email_id</th>
            <th className="th">User password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              {/* Provide a unique key for each row */}
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Loginusers;
