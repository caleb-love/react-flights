import { useEffect, useState } from 'react';
import { flightNumToCallsign } from './utils/airlines-api';

export default function SearchBar( { flights, setTrackedFlight } ){

    const [error, setError] = useState("")
    const [formData, setFormData] = useState()
    const [flightICAO, setFlightICAO] = useState({})

    const handleSubmit = (e) => {

        e.preventDefault()
        
        const callSign = flightNumToCallsign(formData);
        const requiredFlight = flights.filter(flight => flight[1] === callSign);
        setTrackedFlight(requiredFlight)
        // console.log(callSign)
        // console.log(requiredFlight)
    }

    const handleChange = (e) => {

        setFormData(e.target.value)
    }

    return (

        <>
        <form onChange={handleChange} onSubmit={handleSubmit}>
            <input type="text" name="search"/>
            <button>search</button>
        </form>
        </>
    )
    
}


