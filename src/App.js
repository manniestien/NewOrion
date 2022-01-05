import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes, BrowserRouter } from "react-router-dom";
import Login from './login';
import Craneberry from "./CANEBERRY/HomePage"
import Psi from "./PSI/HomePage"
import Monson from "./MORSON_CORS/HomePage"
import CDG from "./CDG/HomePage"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route  exact={true} path="/" component={Login} />
        <Route  exact={true} path="/CRANEBERRY" component={Craneberry} />
        <Route  exact={true} path="/PSI" component={Psi} />
        <Route  exact={true} path="/CDG" component={CDG} />
        <Route  exact={true} path="/MONSON" component={Monson} />


          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
