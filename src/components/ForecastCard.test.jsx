import { render, screen } from '@testing-library/react';
import ForecastCard from './ForecastCard';

const mockForecast = {
    list: [
        { dt: 1618317040, weather: [{ description: 'clear sky' }], main: { temp: 20 } },
        { dt: 1618320640, weather: [{ description: 'few clouds' }], main: { temp: 22 } },
    ],
};

test('renders forecast data', () => {
    render(<ForecastCard forecast={mockForecast} />);
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
    expect(screen.getByText(/20°C/i)).toBeInTheDocument();
});