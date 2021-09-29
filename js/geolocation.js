function geolocationSupport() {
    return 'geolocation' in navigator
}

const defaultoptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 100000
}

export function getCurrentPosition(options = defaultoptions) {
    if (!geolocationSupport) throw new Error('No hay soporte de geolocalización en tu navagador')

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude
            const lon = position.coords.latitude

            resolve(position),
                () => {
                    reject('No hemos podido obtener tu ubicación')
                }, options
        })
    })
}

export async function getLatLon(options = defaultoptions) {
    try {
        const { coords: { latitude: lat, longitude: lon } } = await getCurrentPosition(options)
        return { lat, lon, isError: false }
    }
    catch {
        return { lat: null, lon: null, isError: true }
    }

}