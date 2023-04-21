function onFlightTrack(ICAOnumber) {

    const url = `https://opensky-network.org/api/tracks/all?icao24=${ICAOnumber}&time=0`

    return fetch(url, {
        method:'GET',
    }).then(res => res.json())
}

export { onFlightTrack };