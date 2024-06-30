import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import {
  generateRandomId,
  generateRandomPrice,
  getElementBeforeComma,
} from './helpers.tsx';
import { Destination } from './interfaces.tsx';

const App: React.FC = () => {
  const [startingPoint, setStartingPoint] = useState<Destination>({
    id: generateRandomId(),
    destination: 'London, England',
  });

  const [destinations, setDestinations] = useState<Destination[]>([
    {
      id: generateRandomId(),
      destination: 'Berlin, Germany',
    },
  ]);
  const [vehicle, setVehicle] = useState<string>('car');
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    setPrice(generateRandomPrice());
  }, [destinations.length]);

  const addDestination = () => {
    setDestinations((prevDestinations) => [
      ...prevDestinations,
      {
        id: generateRandomId(),
        destination: '',
      },
    ]);
  };

  const updateDestination = (id: number, newValue: string) => {
    setDestinations((prevDestinations) =>
      prevDestinations.map((dest) =>
        dest.id === id ? { ...dest, destination: newValue } : dest
      )
    );
  };

  const deleteDestination = (id: number) => {
    setDestinations((prevDestinations) =>
      prevDestinations.filter((dest) => dest.id !== id)
    );
  };

  const handleExpenseName = useMemo(() => {
    const destinationsNames = [
      getElementBeforeComma(startingPoint.destination),
      ...destinations.map((el) => getElementBeforeComma(el.destination)),
    ];
    return destinationsNames.join(' - ');
  }, [startingPoint.destination, destinations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      startingPoint,
      destinations,
      vehicle,
      price,
    };
    console.log(data);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Add mileage</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Starting point</label>
            <input
              value={startingPoint.destination}
              onChange={(e) =>
                setStartingPoint((prev) => ({
                  ...prev,
                  destination: e.target.value,
                }))
              }
              placeholder="e.g. Poland"
            />
          </div>

          {destinations.map((el) => (
            <div key={el.id}>
              <label>Destination</label>
              <div className="destination-item">
                <input
                  value={el.destination}
                  onChange={(e) => updateDestination(el.id, e.target.value)}
                  placeholder="e.g. London"
                />
                <span
                  className="delete-icon"
                  onClick={() => deleteDestination(el.id)}
                >
                  🗑️
                </span>
              </div>
            </div>
          ))}

          <p onClick={addDestination}>
            <span className="add-destination-icon">+</span> Add additional
            destination
          </p>
          <div>
            <label>Vehicle</label>
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            >
              <option value="car">Car</option>
              <option value="airplane">Airplane</option>
              <option value="train">Train</option>
            </select>
          </div>
          <label>Expense name</label>
          <input value={handleExpenseName} readOnly />
          <hr />
          <div className="amount-send-container">
            <h3>Amount: {price} &#8364;</h3>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
