export interface Destination {
  id: number;
  destination: string;
}
export interface State {
  startpoint: Destination;
  destinations: Destination[];
  vehicle: string;
  price: string | null;
}

export type Action =
  | { type: 'SET_STARTING_POINT'; payload: string }
  | { type: 'ADD_DESTINATION' }
  | { type: 'UPDATE_DESTINATION'; payload: { id: number; value: string } }
  | { type: 'DELETE_DESTINATION'; payload: number }
  | { type: 'SET_VEHICLE'; payload: string }
  | { type: 'SET_PRICE'; payload: string };
