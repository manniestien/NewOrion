import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes, BrowserRouter } from "react-router-dom";
import PSI from "./PSI/HomePage"
import CRANEBERRY from "./CANEBERRY/HomePage"
import MORSON from "./MORSON_CORS/HomePage"
import CDG from "./CDG/HomePage"
import { useHistory } from "react-router-dom";

const Login = () => {
  
  const [formValue, setformValue] = React.useState({
    email: '',
    password: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formValue;
    if (email && email.trim() && password && password.trim()) {
      localStorage.setItem('token', '123');
    }
  }
  const history = useHistory();

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }

  const ClientRoute = () => {
    
    const { email, password } = formValue;
    console.log(email)
      if (email === "psi@x.com"){
       history.push("/PSI")
      }
      else if(email === "crane@x.com"){
        history.push("/CRANEBERRY")
      }
      else if(email === "monson@email.com"){
        history.push("/MONSON")
      }
      else if(email === "CDG@x.com"){
        history.push("/CDG")
      }
       

      }
  return (
    <form onSubmit={handleSubmit}>
      <p>Login to Get Started</p>
      <input
        type="email"
        name="email"
        placeholder="enter an email"
        value={formValue.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="enter a password"
        value={formValue.password}
        onChange={handleChange}
      />
      <button
        color="primary"
        type="submit"
        onClick={ ClientRoute}
      >
        Login
      </button>
    </form>
  )
};

export default Login;