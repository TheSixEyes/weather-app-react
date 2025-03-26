import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (city) {
            onSearch(city);
            setCity('');
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex justify-center mb-4">
            <input
                type="text"
                value={city}
                onChange={handleInputChange}
                placeholder="Enter city name"
                className="p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
                Search
            </button>
        </form>
    );
};

export default SearchBar;