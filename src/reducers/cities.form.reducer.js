import { handleAction, combineActions } from "redux-actions";
import {
  ADD_CITY,
  ADD_CITY_SUCCESSFUL,
  receiveCities,
  addCity
} from "../actions/cities.action";

let defaultState = {
  items: [],
  loading: true,
  error: null
};

const CitiesFormReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_CITY:
      return {
        ...state,
        data: action.payload.data
      };

    case ADD_CITY_SUCCESSFUL:
      return {
        ...state,
        items: [...state.items, action.payload.data]
      };

    default:
      return state;
  }
};

export default CitiesFormReducer;
