import weather from '../data/current-weather.js'
import { formatDate, formatTemp } from './Utils/format-data.js'
import { weatherConditionCode } from './constants.js'
import { getLatLon } from './geolocation.js'

function setCurrentCity($el, city) {
    $el.textContent = city
}

function setCurrentDate($el) {
    const date = new Date()
    $el.textContent = formatDate(date)
}

function setCurrentTemp($el, temp) {
    $el.textContent = formatTemp(temp)
}

function solarStatus(sunriseTime, sunsetTime) {
    const currentHours = new Date().getHours()
    const sunriseHours = sunriseTime.getHours()
    const sunsetHours = sunsetTime.getHours()

    if (currentHours > sunsetHours || currentHours < sunriseHours) {
        return 'night'
    }

    return 'morning'
}

function setBackground($el, conditionCode, solarStatus) {
    const weatherType = weatherConditionCode[conditionCode]
    const size = window.matchMedia('(-webkit-min-device-pixel-ratio:2)').matches ? '@2x' : ''
    $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`
}

function configCurrentWeather(weather) {
    const $currentWeatherDate = document.querySelector('#current-weather-date')
    const $currentWeatherCity = document.querySelector('#current-weather-city')
    const $currentWeatherTemp = document.querySelector('#current-weather-temp')

    setCurrentCity($currentWeatherCity, weather.name)
    setCurrentDate($currentWeatherDate)
    setCurrentTemp($currentWeatherTemp, weather.main.temp)

    const sunriseTime = new Date(weather.sys.sunrise * 1000)
    const sunsetTime = new Date(weather.sys.sunset * 1000)
    const $app = document.querySelector('#app')
    const conditionCode = String(weather.weather[0].id).charAt(0)

    setBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime))
}

export default async function currentWeather() {

    const { lat, lon, isError } = await getLatLon()
    if (isError) return console.log('Error obteniendo la ubicación')

    console.log(lat, lon)


    getLatLon()
        .then((data) => {

        })
        .catch((message) => {
            console.log(message)
        })
        
    configCurrentWeather(weather)
}