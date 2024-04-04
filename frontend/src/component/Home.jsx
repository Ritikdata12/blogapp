import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Home.css';

const Home = () => {
  // State to store posts and selected category
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetch posts and apply filtering based on selected category
    axios.get('http://localhost:3001/get_blog')
      .then((response) => {
        const filteredPosts = response.data.filter(
          (post) => post.category === selectedCategory || selectedCategory === ''
        );
        setPosts(filteredPosts);
      })
      .catch((err) => console.log(err));
  }, [selectedCategory]);

  return (
    <>
      <Navbar />
      {/* Filter buttons */}
      <div className="filter-buttons">
        <button className="but1" onClick={() => setSelectedCategory('')}>All Categories</button>
        <button className="but1"  onClick={() => setSelectedCategory('programming')}>programming</button>
        <button className="but1"  onClick={() => setSelectedCategory('Technology')}>Technology</button>
        <button className="but1"  onClick={() => setSelectedCategory('politics')}>politics</button>
        {/* Add more buttons for other categories */}
      </div>

      
      <div className='post1'>
        {posts.map((post) => (
          <Link key={post._id} to={`/blog/${post._id}`} className='home1'>
            {post.file && (
              <img
                src={`http://localhost:3001/Images/${post.file}`}
                alt={post.title}
                className='home2'
              />
            )}
            <h2 className='hhh'>{post.title}</h2>
            {/* <p className='category'>{post.category}</p> Display category as a paragraph */}
            <p className='ppp'>
              {post.desc.split(' ').slice(0, 20).join(' ')} ..........
            </p>

            <p className='timestamp'>Created: {new Date(post.createdAt).toLocaleString()}</p> {/* Display timestamp */}
            
          </Link>

          
         
        ))}
      </div>
    </>
  );
};

export default Home;
