import React, { useState } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import './Map.css'

const containerStyle = {
	width: '90vw',
	height: '90vh',
}

const initialCenter = {
	lat: -3.745,
	lng: -38.523,
}

const elonJetCenter = {
	lat: 33.92074,
	lng: -118.32704,
}

function Map() {
	const [center, setCenter] = useState(initialCenter)

	const handleElonJetClick = () => {
		setCenter(elonJetCenter)
	}

	return (
		<LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={10}
			/>
			<button onClick={handleElonJetClick}>Fly with Elon!</button>
		</LoadScript>
	)
}

export default React.memo(Map)
