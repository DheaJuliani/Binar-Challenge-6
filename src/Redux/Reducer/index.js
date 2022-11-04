import { combineReducers } from "@reduxjs/toolkit";
import Reducer from "./Reducer";

export default combineReducers({
  movie: Reducer,
});