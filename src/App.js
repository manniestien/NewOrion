import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes, BrowserRouter } from "react-router-dom";
// import Login from './login';
import Orion from "./HomePage"
import Login2 from './Login 2';
import Cross from './cross';
import Bridge from './bridge';
import Culling from './Culling-Tool/culling-tool'
import Distribution from './Culling-Tool/culling-distribution';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={Login2} />
          <Route exact={true} path="/Select-Tool" component={Bridge} />
          <Route exact={true} path="/Orion" component={Orion} />
          <Route exact={true} path="/cross" component={Cross} />
          <Route exact={true} path="/culling-tool" component={Culling} />
          <Route exact={true} path="/distribution" component={Distribution} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
