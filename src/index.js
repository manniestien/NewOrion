// import 'bootstrap/dist/css/bootstrap.css';
// import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import loginReducer from "./reducers/LoginReducer";
import login from "./LoginActions";
import thunk from "redux-thunk";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
