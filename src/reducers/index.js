import { combineReducers } from "redux";
import clientsReducer from "./clientsReducer";
import clientTriats from "./clientsReducer";


export default combineReducers({
  clients: clientsReducer,
  clientTriats: clientTriats
});
