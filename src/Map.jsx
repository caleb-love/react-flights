import React, { useState } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import './Map.css'

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
    {lat: -3.745, lng: -38.523},
    {lat: -4.7451, lng: -38.523},
    {lat: -5, lng: -38.523},
    {lat: -6, lng: -38.523}
]}

const initialCenter = {
    lat: -3.745,
    lng: -38.523,
}


function Map({ trackedFlight }) {


    console.log(trackedFlight)
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
        console.log("useEffect mapping new path")
        console.log(path)

    }, [trackedFlight])


	const handleElonJetClick = () => {
		setCenter(elonJetCenter)
	}

	return (
		<LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY}>
            
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}>
            
                <Polyline 
                    path={path} 
                    options={options} 
                    />
                <Marker 
                    position={center}
                    icon = {img}
                    
                /> 
            </GoogleMap>
            
			<button onClick={handleElonJetClick}>Fly with Elon!</button>
		</LoadScript>
	)
}

export default React.memo(Map)
