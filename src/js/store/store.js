import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from "../reducers/index.js";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(
  reducer,
);
export default store;
