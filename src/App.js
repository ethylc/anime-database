import React from 'react';
import Search from './components/Search'
import Trending from './components/Trending'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Anime</h1>
      </header>
      <main>
        <Search/>
        <Trending/>
      </main>
    </div>
  );
}

export default App;
