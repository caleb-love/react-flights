import "./App.css"
import { useEffect, useState } from "react"
import SearchBar from "./components/SearchBar"
// import Map from "./Map"
import HomePage from "./pages/HomePage"


function App() {

  return (
    <div className="App">
      <HomePage/>
      {/* <Map /> */}
    </div>
  )
}

export default App
