import axios from 'axios';
import {
  takeLatest,
  call,
  put,
  take,
  takeEvery,
  race,
  select
} from 'redux-saga/effects';
import {
  RECEIVE_CITIES,
  REQUEST_CITIES,
  ADD_CITY,
  GET_CITY,
  REQUEST_CITIES_ERROR,
  receiveCities,
  requestCities,
  addCity,
  addCityComplete
} from '../actions/cities.action';
import { CURRENT_WEATHER, WEATHER_BY_ZIP, API_KEY, ZIPS } from '../config';

// export const delay = (ms) => new Promise(res => setTimeout(res, ms));
let ERROR_STATUS = false;

/** function that returns an axios call */
async function getCitiesApi() {
  return await axios
    .get(`${CURRENT_WEATHER}id=${ZIPS.join()}&appid=${API_KEY}`)
    .then(response => {
      // handle success
      //console.log(response.data.list);
      ERROR_STATUS = false;
      return response.data.list;
      //console.log(response.data.list);
    })
    .catch(function(error) {
      // handle error
      ERROR_STATUS = error;
      return error;
    })
    .finally(function() {
      // always executed
    });
}

async function getCityApi(zipData) {
  return await axios
    .get(`${WEATHER_BY_ZIP}zip=${zipData}&appid=${API_KEY}`)
    .then(response => {
      // handle success
      ERROR_STATUS = false;
      return response.data;
      //console.log(response.data);
    })
    .catch(function(error) {
      // handle error
      ERROR_STATUS = error;
      return error;
    })
    .finally(function() {
      // always executed
    });
}

/**
 * saga watcher that is triggered when dispatching action of type
 * 'CITIES WATCHER'
 */
export function* requestCitiesSaga() {
  yield takeLatest(REQUEST_CITIES, callRequestCities);
  yield race([call(callRequestCities)]);
}

function* callRequestCities() {
  try {
    let data = yield call(getCitiesApi);
    //store data to localStorage
    // Object.keys(data.list).forEach(key => {
    //   localStorage.setItem(key, data[key]);
    // });

    // dispatch action to change redux state

    //return yield put(receiveCities(data));
    if (ERROR_STATUS === false) {
      yield put(receiveCities(data));
    } else {
      yield put({ type: REQUEST_CITIES_ERROR, payload: ERROR_STATUS });
    }
  } catch (error) {
    console.log(error);
    //yield put(requestCitiesError(error));
  }
}

export function* requestCitySaga() {
  yield takeEvery(ADD_CITY, callRequestCity);
  // yield race([call(callRequestCity)]);
}

function* callRequestCity(action) {
  try {
    //const test = yield select(state => state);
    // const { data } = yield take(ADD_CITY);
    // console.log("Saga: " + JSON.stringify(action));
    let result = yield call(getCityApi, action.payload.data);

    // console.log("Saga: " + JSON.stringify(result));

    //store data to localStorage
    // Object.keys(data.list).forEach(key => {
    //   localStorage.setItem(key, data[key]);
    // });

    // dispatch action to change redux state

    //console.log(data);

    //return yield put(receiveCities(data));
    if (ERROR_STATUS === false) {
      yield put({ type: GET_CITY, payload: result });
    } else {
      // console.log("error stats: " + ERROR_STATUS);
      yield put({ type: REQUEST_CITIES_ERROR, payload: ERROR_STATUS });
    }
    //yield call(delay, 1000000);
  } catch (error) {
    yield put({ type: REQUEST_CITIES_ERROR, payload: error });
  }
}
