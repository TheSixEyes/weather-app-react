import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('renders search bar and handles input', () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(/enter city name/i);
    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(handleSearch).toHaveBeenCalledWith('London');
});