import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'https://db.ygoprodeck.com/api/v4/cardinfo.php?fname=';

function useTodosApi(initialData, initialUrl) {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const { data } = await axios.get(url);
        setData(data[0]);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  const doFetch = url => {
    setUrl(url);
  };

  return { data, isLoading, isError, doFetch };
}

function FetchWithCustomHook() {
  const [query, setQuery] = useState('Dark Magician');
  const { data, isLoading, isError, doFetch } = useTodosApi([], URL + query);
  const handleSubmit = event => {
    event.preventDefault();
    doFetch(URL + query);
  };

  return (
    <>
      <h1>Cards</h1>
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
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default FetchWithCustomHook;
