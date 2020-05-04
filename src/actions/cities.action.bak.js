import axios from "axios";

export const GET_CITIES_BEGIN = "GET_CITIES_BEGIN";
export const GET_CITIES_SUCCESS = "GET_CITIES_SUCCESS";
export const GET_CITIES_FAILURE = "GET_CITIES_FAILURE";

const CURRENT_WEATHER = "http://api.openweathermap.org/data/2.5/group?";
const WEATHER_BY_ZIP = "http://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "3d0fbf4365efb0de9cbe8fcbb4442519";
let ZIPS = [5128638, 1689973, 4887398];

export const getCitiesBegin = () => ({
  type: GET_CITIES_BEGIN
});

export const getCitiesSuccess = cities => ({
  type: GET_CITIES_SUCCESS,
  payload: { cities }
});

export const getCitiesFailure = error => ({
  type: GET_CITIES_FAILURE,
  payload: { error }
});

export function getCities() {
  return dispatch => {
    dispatch(getCitiesBegin);
    return axios
      .get(`${CURRENT_WEATHER}id=${ZIPS.join()}&appid=${API_KEY}`)
      .then(response => {
        // handle success
        dispatch(getCitiesSuccess(response.data.list));
        return response.data.list;
      })
      .catch(error => dispatch(getCitiesFailure(error)))
      .finally(function() {
        // always executed
      });
  };
}

export const GET_CITY_BY_ZIP_BEGIN = "GET_CITY_BY_ZIP_BEGIN";
export const GET_CITY_BY_ZIP_SUCCESS = "GET_CITY_BY_ZIP_SUCCESS";
export const GET_CITY_BY_ZIP_FAILURE = "GET_CITY_BY_ZIP_FAILURE";

export const getCityByZipBegin = () => ({
  type: GET_CITY_BY_ZIP_BEGIN
});

export const getCityByZipSuccess = city => ({
  type: GET_CITY_BY_ZIP_SUCCESS,
  payload: { city }
});

export const getCityByZipFailure = error => ({
  type: GET_CITY_BY_ZIP_FAILURE,
  payload: { error }
});

export function getCityByZip(zip) {
  return dispatch => {
    dispatch(getCityByZipBegin);
    return axios
      .get(`${WEATHER_BY_ZIP}zip=${zip}&appid=${API_KEY}`)
      .then(response => {
        // handle success
        dispatch(getCityByZipSuccess(response.data));
        return response.data;
      })
      .catch(error => dispatch(getCityByZipFailure(error)))
      .finally(function() {
        // always executed
      });
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
