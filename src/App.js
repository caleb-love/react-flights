import './App.css'
import { useEffect, useState } from 'react';
import { onFlightTrack } from './opensky_api';


function App() {

  const [error, setError] = useState("")
  const [formData, setFormData] = useState({})
  const [flightICAO, setFlightICAO] = useState({})

  const handleSubmit = (e) => {

    e.preventDefault()

    onFlightTrack(formData.seachOption)
      .then(res => {
        console.log(res)
        setFlightICAO(res)
      })
  }

  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <input type="text" name="search"/>
          <button>search</button>
        </form>
    </div>
  )
}

export default App
