import React from "react";
import "./App.css";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

class App extends React.Component {
  state = {
    location: "jakarta",
    isLoading: false,
    displayLocation: "",
    weather: {},
  };

  fetchWaether = async () => {
    try {
      this.setState({ isLoading: true });
      const { location } = this.state;

      if (!location) {
        throw new Error("Location is missing");
      }

      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) {
        throw new Error("Location not found");
      }

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results[0];

      if (!latitude || !longitude || !timezone || !name || !country_code) {
        throw new Error("Insufficient data in geoData");
      }

      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();

      if (!weatherData.daily) {
        throw new Error("No weather data available");
      }

      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search from location..."
            value={this.state.location}
            onChange={(e) => this.setState({ location: e.target.value })}
          />
        </div>
        <button onClick={() => this.fetchWaether()}>Get weather</button>
        {this.state.isLoading && <p className="loader">Loading...</p>}
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

export default App;

class Weather extends React.Component {
  render() {
    const { weather } = this.props;

    if (!weather) {
      console.error("Missing required prop: weather");
      return null;
    }

    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes,
    } = weather;

    if (!max || !min || !dates || !codes) {
      console.error("Incomplete weather data");
      return null;
    }

    return (
      <div>
        <h2>Weather {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date, i) => {
            const maxTemp = max.at(1);
            const minTemp = min.at(1);
            const code = codes.at(1);

            if (!date || !maxTemp || !minTemp || !code) {
              console.error("Missing required prop(s) for Day component");
              return null;
            }

            return (
              <Day
                date={date}
                max={maxTemp}
                min={minTemp}
                code={code}
                key={date}
                isToday={i === 0}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
class Day extends React.Component {
  render() {
    const { date, max, min, code, isToday } = this.props;

    if (!date || !max || !min || !code) {
      console.error("Missing required props: date, max, min, code");
      return null;
    }

    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? "Today" : formatDay(date)}</p>
        <p>
          {Math.floor(min) || 0}&deg; &mdash;
          <strong>{Math.floor(max) || 0}</strong>;
        </p>
      </li>
    );
  }
}
