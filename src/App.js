import './App.css'
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import Map from './Map'




function App() {

  return (
    <div className="App">
      <SearchBar />
      <Map />
    </div>
  )
}

export default App;