import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'http://hn.algolia.com/api/v1/search?query=';

function fetchWithForm() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('react');
  const [url, setUrl] = useState(URL + query);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  const handleSubmit = event => {
    event.preventDefault();
    setUrl(URL + query);
  };

  return (
    <>
      <h1>Articles</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong...</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default fetchWithForm;
