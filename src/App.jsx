import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState(null);

  function getWeather() {
    const apiKey = "21575d79ab115a8164b0b67eb1d3fbf3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") {
          setWeatherInfo(null);
          setError("City not found. please enter a valid city name.");
          return;
        } else {
          let MT = Math.round(data.main.temp);
          let FL = Math.round(data.main.feels_like);

          const weather = {
            location: `Weather in ${data.name}`,
            temp: `Temperature : ${MT} C`,
            feels_like: `Feels Like : ${FL} C`,
            humidity: `Humidity : ${data.main.humidity} %`,
            wind: `Wind : ${data.wind.speed} km/h`,
            condition: `Weather Condition ${data.weather[0].description}`,
          };

          setWeatherInfo(weather);
          setError(null);
        }
      })

      .catch((err) => {
        console.error(err);
        setError("Something went wrong try again later.");
        setWeatherInfo(null);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    getWeather();
    setCity('');
  }
  return (
    <div className="weather-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherInfo && (
        <div className="weather-info">
          <h3>{weatherInfo.location}</h3>
          <p>{weatherInfo.temp}</p>
          <p>{weatherInfo.feels_like}</p>
          <p>{weatherInfo.humidity}</p>
          <p>{weatherInfo.wind}</p>
          <p>{weatherInfo.condition}</p>
        </div>
      )}
    </div>
  );
}

export default App;
