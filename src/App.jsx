import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { fetchWeatherByCity } from './utils/api';
import { ClipLoader } from 'react-spinners';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(() => {
        // Load dark mode preference from localStorage
        return localStorage.getItem('darkMode') === 'true';
    });

    useEffect(() => {
        // Save dark mode preference to localStorage
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const handleSearch = async (input) => {
        setLoading(true);
        setError(null); // Clear previous error
        try {
            const data = await fetchWeatherByCity(input);
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

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={darkMode ? 'dark' : ''}>
            <h1>Weather App 🌦️</h1>
            <SearchBar onSearch={handleSearch} />
            <button onClick={fetchWeatherByLocation} className="ml-2 p-2 bg-green-500 text-white rounded">
                Use My Location
            </button>
            <button onClick={handleDarkModeToggle} className="ml-2 p-2 bg-gray-500 text-white rounded">
                Toggle Dark Mode
            </button>
            {loading && <ClipLoader color="#007bff" size={50} />}
            {error && <p className="error">⚠️ {error}</p>}
            {weatherData && <WeatherCard data={weatherData} />}
        </div>
    );
};

export default App;