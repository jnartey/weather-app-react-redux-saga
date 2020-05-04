import {
  GET_CITIES_BEGIN,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILURE,
  GET_CITY_BY_ZIP_BEGIN,
  GET_CITY_BY_ZIP_SUCCESS,
  GET_CITY_BY_ZIP_FAILURE
} from "../actions/cities.action";

const initialState = {
  items: [],
  loading: false,
  error: null
};

const CitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CITIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_CITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.cities
      };
    case GET_CITIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };
    case GET_CITY_BY_ZIP_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_CITY_BY_ZIP_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.city
      };
    case GET_CITY_BY_ZIP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };
    default:
      return state;
  }
};

export default CitiesReducer;
