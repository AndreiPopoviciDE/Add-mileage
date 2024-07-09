import { generateRandomId } from './helpers.tsx';
import { State } from './types.ts';
export const initialState: State = {
  startpoint: {
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
