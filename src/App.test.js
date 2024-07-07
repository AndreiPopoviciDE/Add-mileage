import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the helper functions
jest.mock('./helpers.tsx', () => ({
  generateRandomId: jest.fn(() => Math.floor(Math.random() * 1000)),
  generateRandomPrice: jest.fn(() => '50'),
  getElementBeforeComma: jest.fn((str) => str.split(',')[0]),
}));

describe('App Component', () => {
  test('renders Add mileage heading', () => {
    render(<App />);
    const heading = screen.getByText(/add mileage/i);
    expect(heading).toBeInTheDocument();
  });

  test('adds a new destination on clicking "Add additional destination"', () => {
    render(<App />);
    const addDestinationButton = screen.getByText(
      /add additional destination/i
    );
    fireEvent.click(addDestinationButton);
    const newDestinationInputs = screen.getAllByPlaceholderText(/e.g. London/i);
    expect(newDestinationInputs.length).toBe(2); // Initially one, after adding one more should be 2
  });

  test('updates starting point input value', () => {
    render(<App />);
    const startingPointInput = screen.getByPlaceholderText(/e.g. Poland/i);
    fireEvent.change(startingPointInput, {
      target: { value: 'Paris, France' },
    });
    expect(startingPointInput.value).toBe('Paris, France');
  });

  test('submits form and logs data', () => {
    console.log = jest.fn();
    render(<App />);
    const submitButton = screen.getByText(/send/i);
    fireEvent.click(submitButton);
    expect(console.log).toHaveBeenCalled();
  });
});
