import React from 'react';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchWeatherForecast = async (city) => {
    try {
        const response = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
        throw error;
    }
};

const ForecastCard = ({ forecast }) => {
    return (
        <div className="forecast-card">
            {forecast.list.slice(0, 5).map((item, index) => (
                <div key={index} className="forecast-item">
                    <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                    <p>{item.weather[0].description}</p>
                    <p>{item.main.temp}°C</p>
                </div>
            ))}
        </div>
    );
};

export default ForecastCard;