import { all, fork, take } from "redux-saga/effects";
import { REHYDRATE } from 'redux-persist/lib/constants';
// Cities watcher from this file
import { requestCitiesSaga, requestCitySaga } from "./cities.saga";
// import watchers from other files
export default function* rootSaga() {
  console.log("Waiting for rehydration");
  yield take(REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store
  console.log("Rehydrated");

  yield all(
    [
      requestCitiesSaga,
      requestCitySaga
      // add other watchers to the array
    ].map(fork)
  );
}
