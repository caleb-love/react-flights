
import { useEffect, useState } from 'react';
import { onFlightTrack } from './opensky_api';

export default function SearchBar(){

    const [error, setError] = useState("")
    const [formData, setFormData] = useState()
    const [flightICAO, setFlightICAO] = useState({})

    const handleSubmit = (e) => {

    e.preventDefault()

    onFlightTrack(formData)
        .then(res => {
        console.log(res)
        setFlightICAO(res)
        })
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


