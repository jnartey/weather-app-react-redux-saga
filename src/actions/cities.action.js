import { createActions } from 'redux-actions';
// Export constants
export const REQUEST_CITIES = 'REQUEST_CITIES';
export const RECEIVE_CITIES = 'RECEIVE_CITIES';
export const GET_CITY_ZIPS = 'GET_CITY_ZIPS';
export const ADD_CITY = 'ADD_CITY';
export const GET_CITY = 'GET_CITY';
export const REQUEST_CITIES_ERROR = 'REQUEST_CITIES_ERROR';
export const DELETE_CITY = 'DELETE_CITY';

// export const requestCities = createAction(REQUEST_CITIES);
// export const receiveCities = createAction(RECEIVE_CITIES);
// export const requestCitiesError = createAction(RECEIVE_CITIES);

export const {
  requestCities,
  receiveCities,
  requestCitiesError,
  addCity,
  addCityComplete,
  getError,
  deleteCity
} = createActions({
  REQUEST_CITIES: () => ({}),
  RECEIVE_CITIES: data => ({ data }),
  ADD_CITY: data => ({ data }),
  GET_CITY: data => ({ data }),
  REQUEST_CITIES_ERROR: error => ({ error }),
  DELETE_CITY: (id, name) => ({ id, name })
});

// export const requestCities = () => ({
//   type: REQUEST_CITIES,
// });

// export const receiveCities = data => ({
//   type: RECEIVE_CITIES,
//   data: data
// });

// export const requestCitiesError = () => ({
//   type: REQUEST_CITIES_ERROR
// });

// export const addCity = data => ({
//   type: ADD_CITY,
//   data: data
// });

// export const requestCities = () => ({
//   type: REQUEST_CITIES
// });

// export const requestCitiesError = error => ({
//   type: REQUEST_CITIES_ERROR,
//   error: error
// });

// export const receiveCities = cities => ({
//   type: RECEIVE_CITIES,
//   payload: cities
// });

// export const getCityByZip = city => ({
//   type: GET_CITY_BY_ZIP,
//   payload: { city }
// });
