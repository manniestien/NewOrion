import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes, BrowserRouter } from "react-router-dom";
// import Login from './login';
import Orion from "./HomePage"
import Login2 from './Login 2';
import Cross from './cross';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={Login2} />
          <Route exact={true} path="/Orion" component={Orion} />
          <Route exact={true} path="/cross" component={Cross} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
