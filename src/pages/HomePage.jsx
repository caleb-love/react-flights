import { useState, useEffect } from "react"
//import axios from "axios"
import { allActiveFlights, flightByAircraftIcao } from '../utils/opensky_api'
import SearchBar from "../components/SearchBar"
import FlightsCards from "../components/FlightsCards"
import { callsignToFlightnum, filterByRule, mapApiDataToTopFlight } from "../utils/airports"
// import { flightByAircraftIcao } from "../opensky_api";

import Map from "../Map"
import '../pages/HomePage.css'

export default function HomePage() {
  const [flights, setFlights] = useState([])
  const [airlines, setAirlines] = useState([])
  const [trackedFlight, setTrackedFlight] = useState([])
  const [topFlights, setTopFlights] = useState([])
  


  useEffect(() => {
    allActiveFlights()
      // .then(res => setFlights(res.states.slice(0, 10)))
      // Above line commented out by Akram - homepage needs to render searchbar and the travel cards. The searchbar will require an array of ALL active flights (as opposed to 10) for the user input to be compared against. The flights.map() in the render below has been modified to map for the first 10

      .then(res => { setFlights(res.states); return res.states })
      .then((res) => res.filter(filterByRule))
      .then((filteredFlights) => {
        const topXFlights = filteredFlights.slice(0, 12);
        // console.log(topXFlights)

        const flightDataPromises = topXFlights.map(([icao24]) => flightByAircraftIcao(icao24));

        Promise.all(flightDataPromises).then((response) => {
          const definedFlights = response.filter(Boolean);
          // console.log(definedFlights)

          let mappedToTopFlight = definedFlights
            .map((flight, index) => ({
              ...mapApiDataToTopFlight(flight),
              flightNumber: callsignToFlightnum(topXFlights[index][1])
            }))
            .filter(flight => !Object.values(flight).includes('undefined'))
            .filter(flight => !Object.values(flight).includes(''))

          setTopFlights(mappedToTopFlight.slice(0, 6))
        })
      })
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
      <SearchBar flights={flights} setTrackedFlight={setTrackedFlight} />
      <FlightsCards topFlights={topFlights} />
      <ul>
        {/* {flights.slice(0, 10).map(flight => (
          //this needs to change according to the way we want our display
          <li key={flight[0]}>
            {flight[1]} ({flight[2]}) - Altitude: {flight[7]} m
          </li>
        ))} */}
      </ul>
      {trackedFlight[1]!== undefined ? <Map trackedFlight = {trackedFlight[1]}/> : ( <div className="radar"><div className="beacon"></div>
    </div>)}
    </div>
  )
}
