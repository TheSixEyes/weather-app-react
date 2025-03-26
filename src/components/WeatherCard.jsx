import React from 'react';

const WeatherCard = ({ data: weatherData }) => {
    if (!weatherData) {
        return null;
    }

    const { main, weather } = weatherData;
    const temperature = main.temp;
    const humidity = main.humidity;
    const weatherCondition = weather[0].description;
    const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    return (
        <div className="weather-card">
            <img src={weatherIcon} alt={weatherCondition} />
            <h2 className="temperature">{temperature}°C</h2>
            <p className="humidity">Humidity: {humidity}%</p>
            <p className="condition">Condition: {weatherCondition}</p>
        </div>
    );
};

export default WeatherCard;