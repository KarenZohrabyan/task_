import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import auth from "./auth";
const composeEnhancers = composeWithDevTools({});

const reducers = combineReducers({ auth });

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export default store;
