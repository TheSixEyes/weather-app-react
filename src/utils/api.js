const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchWeatherByCity = async (cityOrZip) => {
    try {
        const response = await fetch(
            `${BASE_URL}?q=${cityOrZip}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
            throw new Error('City or ZIP code not found');
        }
        const data = await response.json();
        return {
            ...data,
            location: {
                city: data.name,
                state: data.sys.state || 'N/A', // State is not always available
                country: data.sys.country,
                zip: cityOrZip.match(/^\d+$/) ? cityOrZip : 'N/A', // If input is a ZIP code
            },
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

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