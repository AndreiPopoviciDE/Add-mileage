import {generateRandomId} from './helpers.tsx'
export const initialState = {
    startingPoint: {
      id: generateRandomId(),
      destination: 'London, England',
    },
    destinations: [
      {
        id: generateRandomId(),
        destination: 'Berlin, Germany',
      },
    ],
    vehicle: 'car',
    price: null,
  };