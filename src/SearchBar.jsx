import { useEffect, useState } from 'react'
import { flightNumToCallsign } from './utils/airlines-api'
import { onFlightTrack } from './opensky_api';
import './SearchBar.css'

export default function SearchBar( { flights, setTrackedFlight } ){


    const [formData, setFormData] = useState()

	const handleSubmit = e => {
		e.preventDefault()
		const callSign = flightNumToCallsign(formData)
		const requiredFlight = flights.filter(flight => flight[1] === callSign)
		setTrackedFlight(requiredFlight)
		// console.log(callSign)
		// console.log(requiredFlight)
	}

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
