function geolocationSupport() {
    return 'geolocation' in navigator
}

export function getCurrentPosition() {
    if (!geolocationSupport) throw new Error('No hay soporte de geolocalización en tu navagador')

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude
            const lon = position.coords.latitude

            resolve({ lat, lon }),
                () => {
                    reject('No hemos podido obtener tu ubicación')
                }, {}

        })
    })


}