import { useState } from 'react'
import './WeatherApp.css'
 export const WeatherApp = () => {
    const [city, setCity]=useState('')
    const [weatherData, setweatherData] = useState(null)
    const urlBase='https://api.openweathermap.org/data/2.5/weather'
    const apiKey='APIKEY'
    const difKelvin= 273.15
    
    const handleSubmit=(event) =>{
        event.preventDefault()
        fetchWeatherData()

    }
    const handleCityChange=(event)=>{
        setCity(event.target.value)
    }
    const fetchWeatherData = async()=>{
        try {
            const response= await fetch(`${urlBase}?q=${city}&appid=${apiKey}&lang=es`)
            const data=await response.json()
            setweatherData(data)

        } catch (error) {
            console.error("Ocurrió un error: ",error)
        }
    }
  return (
    <div className="container">
      <h1>Está será la aplicación del clima</h1>
      <form onSubmit={handleSubmit} >
        <input type="text" placeholder="Ingresá una ciudad" value={city} onChange={handleCityChange} />
        <button type="submit">Buscar</button>
      </form>
      {weatherData && (
        <div>
            <h2>{weatherData.name}, {weatherData.sys.country} </h2>
            <p> Temperatura actual {Math.floor(weatherData.main.temp - difKelvin)}°C</p>
            <p> Condición meteorlógica {weatherData.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
            alt={weatherData.weather[0].description} />
        </div>
      )}
    </div>
  )
}


