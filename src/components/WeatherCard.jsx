import React from 'react';

const WeatherCard = ({ data }) => {
    const { location } = data;

    return (
        <div className="weather-card">
            <h2>{location.city}, {location.state}, {location.country}</h2>
            {location.zip !== 'N/A' && <p>ZIP Code: {location.zip}</p>}
            <p>{data.weather[0].description}</p>
            <p>Temperature: {data.main.temp}°C</p>
            <p>Humidity: {data.main.humidity}%</p>
        </div>
    );
};

export default WeatherCard;