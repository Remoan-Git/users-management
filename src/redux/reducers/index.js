import { combineReducers } from "redux";

const initialState = {
  users: [],
  isUsersFetched: false,
};

const usersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      return action.payload;
    case "FETCH_USERS_ERROR":
      console.error("Error fetching users:", action.payload);
      return state;
    case "ADD_USER":
      return [...state, action.payload];
    case "DELETE_USER":
      return state.filter((user) => user.id !== action.payload);
    case "UPDATE_USER":
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    default:
      return state;
  }
};

const isUsersFetchedReducer = (state = initialState.isUsersFetched, action) => {
  switch (action.type) {
    case "SET_USERS_FETCHED":
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  users: usersReducer,
  isUsersFetched: isUsersFetchedReducer,
});

export default rootReducer;
