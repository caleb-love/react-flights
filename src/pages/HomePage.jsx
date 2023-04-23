import { useState, useEffect } from "react"
//import axios from "axios"
import { allActiveFlights } from '../utils/opensky_api'
import SearchBar from "../SearchBar"
import Map from "../Map"
import '../pages/HomePage.css'

export default function HomePage() {
  const [flights, setFlights] = useState([])
  const [airlines, setAirlines] = useState([])
  const [trackedFlight, setTrackedFlight] = useState([])
  


  useEffect(() => {
    allActiveFlights()
      // .then(res => setFlights(res.states.slice(0, 10)))
      // Above line commented out by Akram - homepage needs to render searchbar and the travel cards. The searchbar will require an array of ALL active flights (as opposed to 10) for the user input to be compared against. The flights.map() in the render below has been modified to map for the first 10

      .then(res => setFlights(res.states))
      .catch(err => console.log(err.message))
  }, [])

  //fetch the json data and store it is airlineData and compare it with the flights state
  let airlineName = []
  // The below code commented out by Akram - it was giving an error whenever React tried to run it for me. Currently airlinesData doesn't exist, until it's ready I've commented it out so the site can run.

  // setFlights.forEach(flight => {
  //   airlineName = airlinesData.find(airline => airline.ICAO === flight[0])
  // })


  return (
    <div>
      <h1>My OpenSky App</h1>
      <SearchBar trackedFlight = {trackedFlight} flights = {flights} setTrackedFlight={setTrackedFlight}/>
      <ul>
        {flights.slice(0,10).map(flight => (
          //this needs to change according to the way we want our display
          <li key={flight[0]}>
            {flight[1]} ({flight[2]}) - Altitude: {flight[7]} m
          </li>
        ))}
      </ul>
      {trackedFlight[1]!== undefined ? <Map trackedFlight = {trackedFlight[1]}/> : ( <div className="radar"><div className="beacon"></div>
    </div>)}
    </div>
  )
}
