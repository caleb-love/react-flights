import { useEffect, useState } from 'react';
import { flightNumToCallsign } from './utils/airlines-api';
import { onFlightTrack } from './utils/opensky_api';

export default function SearchBar( { flights, setTrackedFlight, trackedFlight } ){

    const [formData, setFormData] = useState()


    const handleSubmit = (e) => {

        e.preventDefault()
        
        const callSign = flightNumToCallsign(formData);
        const requiredFlight = flights.filter(flight => flight[1] === callSign);
		

        if(requiredFlight[0][0].length !== undefined){
            onFlightTrack(requiredFlight[0][0]).then(res => setTrackedFlight([...requiredFlight, res]))   
        }

    }

	console.log(trackedFlight)

	const handleChange = e => {
		setFormData(e.target.value)
	}

	return (
		<form
			className='flight-search'
			onChange={handleChange}
			onSubmit={handleSubmit}>
			<div className='search-wrapper'>
				<input
					type='text'
					id='search'
					name='search'
					placeholder='Enter flight number'
				/>
				<button type='submit'>Search</button>
			</div>
		</form>
	)
}
