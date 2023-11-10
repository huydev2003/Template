import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authenticationReducer from "./authentication/reducers";
import redirectReducer from "./redirect/reducers";
import cartReducer from "./cart/reducers";
import discountReducer from "./discount/reducers";
import orderReducer from "./order/reducers";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authenticationReducer,
  redirect: redirectReducer,
  cart: cartReducer,
  discount: discountReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  return createStore(persistedReducer, composeEnhancers(middlewareEnhancer));
};

const store = configureStore();
const persistor = persistStore(store);

export { store, persistor };
