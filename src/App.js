import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes, BrowserRouter } from "react-router-dom";
import Login from './login';
import Craneberry from "./CANEBERRY/HomePage"
import Psi from "./PSI/HomePage"
import Monson from "./MORSON_CORS/HomePage"
import CDG from "./CDG/HomePage"
import Chipher from "./ChipherLab/homepage"
import Login2 from './Login 2';
import Cross from './cross';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={Login2} />
          <Route exact={true} path="/CRANEBERRY" component={Craneberry} />
          <Route exact={true} path="/Orion" component={Psi} />
          <Route exact={true} path="/CDG" component={CDG} />
          <Route exact={true} path="/MONSON" component={Monson} />
          <Route exact={true} path="/Chipher" component={Chipher} />
          <Route exact={true} path="/cross" component={Cross} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
