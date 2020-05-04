// export const toggleTempUnitFunct = (unit, TOGGLED_TEMP) => {
//   if (unit === "F") {
//     return (TOGGLED_TEMP = "F");
//   } else if (unit === "C") {
//     return (TOGGLED_TEMP = "C");
//   }
// };

export const convertTempFunct = (unit, temp) => {
  if (unit === "F") {
    // Convert from kelvin units to Fahrenheit
    const result = Math.round(((temp - 273.15) * 9) / 5 + 32);
    return result.toFixed(0) + "\u00b0F";
  } else if (unit === "C") {
    // Convert from kelvin units to Celcius
    const result = Math.round(temp - 273.15);
    return result.toFixed(0) + "\u00b0C";
  }
};

export const defaultTempFunct = (unit, temp) => {
  if (unit === "F") {
    return convertTempFunct(unit, temp);
  } else if (unit === "C") {
    return convertTempFunct(unit, temp);
  }
};

export const deleteCityFunct = (id, name) => {};
