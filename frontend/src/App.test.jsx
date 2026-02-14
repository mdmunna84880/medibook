import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock redux
vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
}));

// Mock child components
vi.mock('./routes', () => ({
  default: () => <div data-testid="app-routes">App Routes</div>,
}));

// Mock the react-toastify
vi.mock('react-toastify', () => ({
  ToastContainer: () => (
    <div data-testid="toast-container">Toast Container</div>
  ),
}));

describe('App layout on first render', () => {
  test('displays the toast notification container', () => {
    render(<App />);
    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
  });

  test('loads the application routes', () => {
    render(<App />);
    expect(screen.getByTestId('app-routes')).toBeInTheDocument();
  });

  test('renders both core UI elements together', () => {
    render(<App />);

    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
    expect(screen.getByTestId('app-routes')).toBeInTheDocument();
  });
});
