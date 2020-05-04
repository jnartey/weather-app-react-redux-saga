import { combineReducers } from "redux";
import CitiesReducer from "./cities.reducer";
//import CitiesFormReducer from "./cities.form.reducer";
import TemperatureReducer from "./temperature.reducer";

const allReducers = combineReducers({
  cities: CitiesReducer,
  //form: CitiesFormReducer,
  temp: TemperatureReducer
});

export default allReducers;
