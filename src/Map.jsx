import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api'
import './Map.css'
import planeIcon from './plane.png'

const containerStyle = {
	width: '90vw',
	height: '90vh',
}

const elonJetCenter = {
	lat: 33.92074,
	lng: -118.32704,
}

const options = {
	strokeColor: '#FF0000',
	strokeOpacity: 0.8,
	strokeWeight: 2,
	fillColor: '#FF0000',
	paths: [
		{ lat: -3.745, lng: -38.523 },
		{ lat: -4.7451, lng: -38.523 },
		{ lat: -5, lng: -38.523 },
		{ lat: -6, lng: -38.523 },
	],
}

const initialCenter = {
	lat: -3.745,
	lng: -38.523,
}

function Map({ trackedFlight }) {
	const [center, setCenter] = useState(initialCenter)
	const [path, setPath] = useState([])

	useEffect(() => {
		const pathLength = trackedFlight.path.length - 1

    const [center, setCenter] = useState(initialCenter)
    const [path, setPath] = useState([])



    useEffect(() => {

        const pathLength = trackedFlight.path.length -1


        setPath(trackedFlight.path.reduce((acc, curr) => {

            return [...acc, {["lat"]: curr[1], ["lng"]:curr[2]}]
            }, [])
        )

        setCenter({
            lat: trackedFlight.path[pathLength][1],
            lng: trackedFlight.path[pathLength][2],
        })

    }, [trackedFlight])

		setCenter({
			lat: trackedFlight.path[pathLength][1],
			lng: trackedFlight.path[pathLength][2],
		})
	}, [trackedFlight])

	const handleElonJetClick = () => {
		setCenter(elonJetCenter)
	}

	// function getCurrentDirection(previousCoordinates, currentCoordinates) {
	// 	const diffLat = currentCoordinates.lat - previousCoordinates.lat
	// 	const diffLng = currentCoordinates.lng - previousCoordinates.lng
	// 	const anticlockwiseAngleFromEast = convertToDegrees(
	// 		Math.atan2(diffLat, diffLng)
	// 	)
	// 	const clockwiseAngleFromNorth = 90 - anticlockwiseAngleFromEast
	// 	return clockwiseAngleFromNorth

	// 	function convertToDegrees(radian) {
	// 		return (radian * 180) / Math.PI
	// 	}
	// }

	return (
		<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={10}>
				<Polyline path={path} options={options} />
				<Marker
					position={center}
					icon={{
						url: planeIcon,
						// anchor: new window.google.maps.Point(25, 25),
					}}
				/>
			</GoogleMap>

			<button onClick={handleElonJetClick}>Fly with Elon!</button>
		</LoadScript>
	)
}

export default React.memo(Map)
