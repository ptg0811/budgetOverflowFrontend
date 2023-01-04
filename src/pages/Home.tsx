import React from 'react';

const Home = () => {
  const handleGetAuth = () => {
    const temp = window.open('about:blank');
    if (temp !== null) temp.location = '';
  };

  return (
    <div>
      Home<button onClick={handleGetAuth}>get</button>
    </div>
  );
};

export default Home;
