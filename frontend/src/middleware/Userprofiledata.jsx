import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar';

const Userprofiledata = () => { // Removed element prop since it's not used

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/userprofiledata');
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
          user.gender &&
          (
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.gender.toLowerCase().includes(searchTerm.toLowerCase())
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
            <th className="th">name</th>
            <th className="th">user name</th>
            <th className="th">File</th>
            <th className="th">email id</th>
            <th className="th">gender</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>
                <Link to={`/userprofile/${user._id}`}> {/* Wrap image link in Link */}
                  <img src={`http://localhost:3001/Images/${user.file}`} className='images' alt={user.title} />
                </Link>
              </td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Userprofiledata
