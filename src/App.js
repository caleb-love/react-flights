import "./App.css"
import { useEffect, useState } from "react"
import SearchBar from "./SearchBar"
import Map from "./Map"
import HomePage from "./pages/HomePage"


function App() {
  return (
    <div className="App">
      {/* <SearchBar /> */}
      <HomePage />
      <Map />
    </div>
  )
}

export default App
