import { legacy_createStore as createStore } from "redux";
import { applyMiddleware } from "redux";
import rootReducer from "./reducers";
import axios from "axios";

const fetchUsersMiddleware = (store) => (next) => (action) => {
  if (action.type === "FETCH_USERS" && !store.getState().isUsersFetched) {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        next({ type: "FETCH_USERS_SUCCESS", payload: response.data });
        next({ type: "SET_USERS_FETCHED", payload: true });
      })
      .catch((error) => {
        next({ type: "FETCH_USERS_ERROR", payload: error });
      });
  }
  return next(action);
};

const store = createStore(rootReducer, applyMiddleware(fetchUsersMiddleware));

export default store;
