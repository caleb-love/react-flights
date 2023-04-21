import React, { useState, useRef } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

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
	const mapRef = useRef(null)

	const handleElonJetClick = event => {
		event.preventDefault()
		const map = mapRef.current
		if (map) {
			map.panTo(elonJetCenter, 3000)
		}
	}

	const handleMapLoad = map => {
		mapRef.current = map
	}

	return (
		<LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={10}
				onLoad={handleMapLoad}></GoogleMap>
			<button onClick={handleElonJetClick}>elonJet</button>
		</LoadScript>
	)
}

export default React.memo(Map)
