import './FlightsCards.css'
import { flightNumToCallsign } from '../utils/airlines';
import { onFlightTrack } from './../utils/opensky_api';

export default function FlightsCards({ topFlights, flights, setTrackedFlight }) {

    const handleClick = (e) => {
        const flightNum = e.target.closest('.flight-card').id
        const callsign = flightNumToCallsign(flightNum)

        const requiredFlight = flights.filter(flight => flight[1] === callsign);
        setTrackedFlight(requiredFlight)

        if(requiredFlight[0][0].length !== undefined){
            onFlightTrack(requiredFlight[0][0]).then(res => setTrackedFlight([...requiredFlight, res]))   
        }
    }

    return (
        <section className="cards-list">

            {topFlights.map(flight => (
                <article onClick={handleClick} className='flight-card' id={`${flight['flightNumber']}`} key={flight['flightNumber']}>
                    <p>{flight['flightNumber']} </p>
                    <div>
                        <span>Dep: {flight['departureAirport']} </span>
                        <span>Arr: {flight['arrivalAirport']} </span>
                    </div>
                </article>
            ))}

        </section>
    )
}