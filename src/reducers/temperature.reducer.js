import { handleAction, combineActions } from "redux-actions";
import {
  DEFAULT_TEMP_UNIT,
  TOGGLE_TEMP_UNIT,
  GET_DEFAULT_TEMP_UNIT,
  getDefaultTempUnit,
  toggleTempUnit
} from "../actions/temperature.action";

let defaultState = {
  unit: DEFAULT_TEMP_UNIT
};

const TemperatureReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_TEMP_UNIT:
      // return Object.assign({}, state, {
      // console.log(JSON.stringify(action));
      return { ...state, unit: action.unit };
    // });
    case GET_DEFAULT_TEMP_UNIT:
      return {
        unit: state.unit
      };
    case 'persist/REHYDRATE':
      return { ...state, persistedState: action.payload };
    default:
      return state;
  }
};

export default TemperatureReducer;
