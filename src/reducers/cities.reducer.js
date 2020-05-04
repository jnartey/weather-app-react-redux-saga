import { handleAction, combineActions } from "redux-actions";
import {
  REQUEST_CITIES,
  RECEIVE_CITIES,
  REQUEST_CITIES_ERROR,
  ADD_CITY,
  GET_CITY,
  DELETE_CITY
} from "../actions/cities.action";

let defaultState = {
  items: [],
  loading: true,
  message: null,
  error: null
};

const CitiesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_CITIES:
      return {
        ...state,
        loading: false
      };
    case RECEIVE_CITIES:
      // console.log("action: " + JSON.stringify(action));
      let newState = {
        ...state,
        loading: false,
        items: action.payload.data
      };
      return newState;
    case ADD_CITY:
      return {
        ...state,
        data: action.payload.data
      };
    case GET_CITY:
        let cityExists = false;
        state.items.map((item) => {
          if (item.id === parseInt(state.data)) {
             cityExists = true;
          }
        });

        if(cityExists === true){
          return {
            ...state,
             error: "City with Zip code " + state.data + " already exists"
          }
        } else {
          // Updating new added city id which is always zero with zip code
          action.payload.id = parseInt(state.data);
          return {
            ...state,
            items: [...state.items, action.payload],
            message: "City with zip code " + state.data + " added successfully"
          };
        }
    case DELETE_CITY:
    return {
      ...state,
      items: state.items.filter(city => city.id !== action.payload.id),
      message: "City " + action.payload.name + " deleted successfully"
    };
    case REQUEST_CITIES_ERROR: 
    return {
      ...state,
      error: JSON.stringify(action.payload.message)
    };
    case 'persist/REHYDRATE':
      return { ...state, persistedState: action.payload };
    default:
      return state;
  }
};

// const CitiesReducer = handleAction(
//   combineActions(receiveCities, addCity),
//   {
//     next(state, action) {
//       switch (action.type) {
//         case REQUEST_CITIES:
//           return {
//             ...state,
//             loading: false
//           };
//         case RECEIVE_CITIES:
//           // console.log("action: " + JSON.stringify(action));
//           let newState = {
//             ...state,
//             loading: false,
//             items: action.payload.data
//           };
//           return newState;
//         case ADD_CITY:
//           return {
//             ...state,
//             items: [...state.items, action.payload.data]
//           };

//         default:
//           return state;
//       }
//     },
//     throw(state, action) {
//       switch (action.type) {
//         case RECEIVE_CITIES:
//           // console.log("action: " + JSON.stringify(action));
//           let newState = {
//             ...state,
//             loading: false,
//             items: action.payload.data
//           };

//           return newState;

//         case ADD_CITY:
//           return {
//             ...state,
//             items: [...state.items, action.payload.data]
//           };
//         default:
//           return state;
//       }
//     }
//   },
//   defaultState
// );

export default CitiesReducer;
