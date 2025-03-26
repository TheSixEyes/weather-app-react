import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { fetchWeatherByCity } from './utils/api';
import { ClipLoader } from 'react-spinners';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const handleSearch = async (city) => {
        setLoading(true);
        setError(null); // Clear previous error
        try {
            const data = await fetchWeatherByCity(city);
            setWeatherData(data);
        } catch (err) {
            setError('Could not fetch weather data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchWeatherByLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(
                        `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
                    );
                    const data = await response.json();
                    setWeatherData(data);
                } catch (error) {
                    setError('Could not fetch weather data for your location.');
                }
            });
        } else {
            setError('Geolocation is not supported by your browser.');
        }
    };

    return (
        <div className={darkMode ? 'dark' : ''}>
            <h1>Weather App 🌦️</h1>
            <SearchBar onSearch={handleSearch} />
            <button onClick={fetchWeatherByLocation} className="ml-2 p-2 bg-green-500 text-white rounded">
                Use My Location
            </button>
            <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
            {loading && <ClipLoader color="#007bff" size={50} />}
            {error && <p className="error">⚠️ {error}</p>}
            {weatherData && <WeatherCard data={weatherData} />}
        </div>
    );
};

export default App;