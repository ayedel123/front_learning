import "./App.css";
import Weather from "./components/weather";
import React, { useEffect, useState } from "react";

function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async (latitude, longitude) => {
      try {
        const fetchUrl = `${process.env.REACT_APP_API_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
        // console.log(result);
      } catch (error) {
        console.error("Fetch error:", error);
        console.error("Булат опять всё сломал!");
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLat(latitude);
        setLong(longitude);
        fetchData(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }, []);

  return (
    <div className="App">
      {data && data.main ? (
        <div className="WeatherWrapper">
        <Weather weatherData={data} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
