import { createActions } from "redux-actions";
// Export constants
export const DEFAULT_TEMP_UNIT = "F";
export const TOGGLE_TEMP_UNIT = "TOGGLE_TEMP_UNIT";
export const GET_DEFAULT_TEMP_UNIT = "GET_DEFAULT_TEMP_UNIT";

export const toggleTempUnit = unit => ({
  type: TOGGLE_TEMP_UNIT,
  unit: unit
});

export const getDefaultTempUnit = unit => ({
  type: GET_DEFAULT_TEMP_UNIT,
  unit: unit
});

// export const convertTemp = (unit, temp) => ({
//   type: CONVERT_TEMP,
//   unit: unit,
//   temp: temp
// });

// export const defaultTemp = temp => ({
//   type: DEFAULT_TEMP,
//   temp: temp
// });

// export const deleteCity = (id, name) => ({
//   type: DELETE_CITY,
//   id: id,
//   name: name
// });
