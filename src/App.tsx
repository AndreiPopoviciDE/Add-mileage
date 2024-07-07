import React, { useReducer, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import './App.css';
import {
  generateRandomId,
  generateRandomPrice,
  getElementBeforeComma,
} from './helpers.tsx';
import { State, Action } from './types';
import { appReducer } from './reducer.tsx';

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const InnerContainer = styled.div`
  padding: 1rem;
`;

const Heading = styled.div`
  color: #333;
  text-align: left;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
`;

const Input = styled.input`
  width: 87%;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const ReadOnlyInput = styled(Input)`
  background-color: #f0f0f0;
  cursor: not-allowed;
`;

const Select = styled.select`
  width: 87%;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 1rem 0;
`;

const Paragraph = styled.p`
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
  text-align: left;
  font-size: 1rem;
  display: flex;
  align-items: center;
  &:hover {
    color: #0056b3;
  }
`;

const AmountSendContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubHeading = styled.h3`
  color: #333;
  text-align: left;
  margin-bottom: 1rem;
`;

const AddDestinationIcon = styled.span`
  color: #007bff;
  font-size: 1.5rem;
  margin-right: 0.5rem;
`;

const DestinationItem = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteIcon = styled.span`
  color: #888;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 0.5rem;
`;

const initialState: State = {
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

const App: React.FC = () => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    appReducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: 'SET_PRICE', payload: generateRandomPrice() });
  }, [state.destinations.length]);

  const addDestination = () => {
    dispatch({ type: 'ADD_DESTINATION' });
  };

  const updateDestination = (id: number, newValue: string) => {
    dispatch({
      type: 'UPDATE_DESTINATION',
      payload: { id, value: newValue },
    });
  };

  const deleteDestination = (id: number) => {
    dispatch({ type: 'DELETE_DESTINATION', payload: id });
  };

  const handleExpenseName = useMemo(() => {
    const destinationsNames = [
      getElementBeforeComma(state.startpoint.destination),
      ...state.destinations.map((el) => getElementBeforeComma(el.destination)),
    ];
    return destinationsNames.join(' - ');
  }, [state.startpoint.destination, state.destinations]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      startpoint: state.startpoint,
      destinations: state.destinations,
      vehicle: state.vehicle,
      price: state.price,
    };
    console.log(data);
  };

  return (
    <Container>
      <InnerContainer>
        <Heading>Add mileage</Heading>
        <Form onSubmit={handleSubmit}>
          <React.Fragment>
            <Label>Starting point</Label>
            <Input
              value={state.startpoint.destination}
              onChange={(e) =>
                dispatch({
                  type: 'SET_STARTING_POINT',
                  payload: e.target.value,
                })
              }
              placeholder="e.g. Poland"
            />
          </React.Fragment>

          {state.destinations.map((el) => (
            <React.Fragment key={el.id}>
              <Label>Destination</Label>
              <DestinationItem>
                <Input
                  value={el.destination}
                  onChange={(e) => updateDestination(el.id, e.target.value)}
                  placeholder="e.g. London"
                />
                <DeleteIcon onClick={() => deleteDestination(el.id)}>
                  🗑️
                </DeleteIcon>
              </DestinationItem>
            </React.Fragment>
          ))}

          <Paragraph onClick={addDestination}>
            <AddDestinationIcon>+</AddDestinationIcon> Add additional
            destination
          </Paragraph>
          <React.Fragment>
            <Label>Vehicle</Label>
            <Select
              value={state.vehicle}
              onChange={(e) =>
                dispatch({ type: 'SET_VEHICLE', payload: e.target.value })
              }
            >
              <option value="car">Car</option>
              <option value="airplane">Airplane</option>
              <option value="train">Train</option>
            </Select>
          </React.Fragment>
          <Label>Expense name</Label>
          <ReadOnlyInput value={handleExpenseName} readOnly />
          <Divider />
          <AmountSendContainer>
            <SubHeading>Amount: {state.price} &#8364;</SubHeading>
            <Button type="submit">Send</Button>
          </AmountSendContainer>
        </Form>
      </InnerContainer>
    </Container>
  );
};

export default App;
