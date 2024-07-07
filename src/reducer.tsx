import { generateRandomId } from './helpers.tsx';
import { State, Action } from './types.ts';
export function appReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_STARTING_POINT':
      return {
        ...state,
        startpoint: {
          ...state.startpoint,
          destination: action.payload,
        },
      };
    case 'ADD_DESTINATION':
      return {
        ...state,
        destinations: [
          ...state.destinations,
          { id: generateRandomId(), destination: '' },
        ],
      };
    case 'UPDATE_DESTINATION':
      return {
        ...state,
        destinations: state.destinations.map((dest) =>
          dest.id === action.payload.id
            ? { ...dest, destination: action.payload.value }
            : dest
        ),
      };

    case 'DELETE_DESTINATION':
      return {
        ...state,
        destinations: state.destinations.filter(
          (dest) => dest.id !== action.payload
        ),
      };

    case 'SET_VEHICLE':
      return {
        ...state,
        vehicle: action.payload,
      };

    case 'SET_PRICE':
      return {
        ...state,
        price: action.payload,
      };
  }
}
