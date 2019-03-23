import React from 'react';
import SimpleFetch from './SimpleFetch';
import FetchWithForm from './FetchWithForm';
import FetchWithCustomHook from './FetchWithCustomHook';
import FetchWithReducer from './FetchWithReducer';

function App() {
  return (
    <>
      <SimpleFetch />
      <FetchWithForm />
      <FetchWithCustomHook />
      <FetchWithReducer />
    </>
  );
}

export default App;
