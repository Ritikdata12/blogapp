import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Apidata = () => {
  const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000');
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

useEffect(() => {
    const userId = 18;  // Set the user ID dynamically or fetch it from somewhere
    const apiUrl = `http://localhost:5000/${userId}`;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);  // Make sure to add any dependencies if needed

  return (
    <div>
      {data.map((item) => (
        <div key={item.blog_id}>
          <h2>{item.blog_title}</h2>
          <p>{item.clean_blog_content}</p>
          <img src={item.image} alt="Blog" />
          {/* <a href={item.link} target="_blank" rel="noopener noreferrer">
            Read more
          </a> */}
          <Link to={item.link}>
            Read more
          </Link>

        </div>
      ))}
    </div>
  );
};

export default Apidata;
