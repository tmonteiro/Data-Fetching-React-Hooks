import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const URL = 'https://pokeapi.co/api/v2/pokemon/';

function dataFetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
}

function useDataApi(initialData, initialUrl) {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: true,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const { data } = await axios.get(url);
        !didCancel && dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        !didCancel && dispatch({ type: 'FETCH_FAILURE' });
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  const doFetch = url => {
    setUrl(url);
  };

  return { ...state, doFetch };
}

function FetchWithReducer() {
  const [query, setQuery] = useState('squirtle');
  const { data, isLoading, isError, doFetch } = useDataApi({}, URL + query);
  const handleSubmit = event => {
    event.preventDefault();
    doFetch(URL + query);
  };

  return (
    <>
      <h1>Pokémon</h1>
      <form onSubmit={handleSubmit}>
        <select value={query} onChange={event => setQuery(event.target.value)}>
          <option value="pikachu">Pikachu</option>
          <option value="squirtle">Squirtle</option>
          <option value="bulbasaur">Bulbasaur</option>
          <option value="charmander">Charmander</option>
        </select>
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <img src={data.sprites.front_default} alt={data.name} />
      )}
    </>
  );
}

export default FetchWithReducer;
