import React, { useEffect, useState } from 'react';

const api = {
  key: '3eb916e1f9ad41c6a59f8168cf8099bb',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  // const [location, setLocation] = useState(null);
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(data => {
          setWeather(data);
          setQuery('');
          console.log(data);
        })
        .catch(err => {
          setError(err)
        })
    }
  }

  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  useEffect( () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      const {latitude, longitude} = position.coords;
      console.log(latitude, longitude);
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${api.key}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setWeather(data);
          setQuery('');
        })
        .catch(err => {
          console.log(err.message);
          setError(err);
        })
          
    });
  }, []);

  return (
    <div className="phone">
      <div className="App ">
        <main>
          <div className="search-box">
            <input 
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange ={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}</div>
                <div className="weather">{weather.weather[0].description}</div>
              </div>  
            </div>
          ) : ('')}
          {error && <div>There was an error retrieving the weather.</div>}
        </main>
      </div>
    </div>
  );
}

export default App;
