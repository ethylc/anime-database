import React, {useState} from 'react';
import Search from './components/SearchBox'
import Results from './components/Results'
import {getSeason} from './functions/utils'

function App() {
  const [state, setState] = useState({
    results: [],
    selected: {},
    search: undefined,
    year: new Date().getFullYear(),
    season: getSeason()
  })

  const handleInput = (e) => {
    let s = e.target.value
    setState(prevState => {return { ...prevState, s: s}})
  }

  const search = (e) => {
    if (e.key === "Enter") {
      if (state.s === ""){
        setState(prevState => {
          return {...prevState, search: undefined, year: new Date().getFullYear(), season: getSeason()}
        })
      }else if (state.s === undefined) {
        setState(prevState => {
          return {...prevState, year: new Date().getFullYear(), season: getSeason()}
        })
      } else{
        setState(prevState => {
          return {...prevState,search: state.s, year: undefined, season:undefined}
        })
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>Anime Browser</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search}/>
        <Results name = {state.search} year = {state.year} season ={state.season}/>
      </main>
    </div>
  );
}

export default App;
