import React, { useState, useEffect } from 'react';
import axios from 'axios';

function simpleFetch() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      setPosts(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
}

export default simpleFetch;
