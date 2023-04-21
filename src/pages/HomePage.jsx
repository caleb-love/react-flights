import { useState, useEffect } from "react"
//import axios from "axios"

export default function HomePage() {
  const [flights, setFlights] = useState([])
  const [airlines, setAirlines] = useState([])

  useEffect(() => {
    fetch("https://opensky-network.org/api/states/all", {
      headers: {
        Authorization: "Basic " + btoa("pragmaticFlights:testing@123"),
      },
    })
      .then(res => res.json())
      .then(res => setFlights(res.states.slice(0, 10)))
      .catch(err => console.log(err.message))
  }, [])

  //fetch the json data and store it is airlineData and compare it with the flights state
  let airlineName = []
  setFlights.forEach(flight => {
    airlineName = airlinesData.find(airline => airline.ICAO === flight[0])
  })

  return (
    <div>
      <h1>My OpenSky App</h1>
      <ul>
        {flights.map(flight => (
          //this needs to change according to the way we want our display
          <li key={flight[0]}>
            {flight[1]} ({flight[2]}) - Altitude: {flight[7]} m
          </li>
        ))}
      </ul>
    </div>
  )
}
