import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootSaga from "../sagas/root.saga";
import allReducers from "../reducers";

// Redux persist configuration
const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, allReducers)

/** Saga Middleware */
const sagaMiddleware = createSagaMiddleware();
/** Create middlewares for redux */
let middlewares = applyMiddleware(sagaMiddleware, logger);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/** Create redux store */
// const store = createStore(
//   allReducers,
//   undefined,
//   composeEnhancers(middlewares)
// );

// Exporting integrated persist and store
  export const store = createStore(
    persistedReducer,
    undefined,
    composeEnhancers(middlewares)
  );

  export const persistor = persistStore(store);

  /** run saga watchers */
  sagaMiddleware.run(rootSaga);


//export default store;
