import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from "react-switch";
import './home.css'
import Logo from './asserts/ezgif.com-gif-maker (1).gif'
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from "@restart/ui/esm/Button";
import { Dropdown } from "react-bootstrap";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
     padding: theme.spacing(1),
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
    width: '50%'
  }));


export default class Home extends Component{
    constructor() {
        super();
        this.state = { checked: false };
        this.handleChange = this.handleChange.bind(this);
        this.routeChange = this.routeChange.bind(this);
      }
    
      handleChange(checked) {
        this.setState({ checked });
      }

      routeChange() {
        this.props.history.push("/cross");
      }
    
      render() {
        return (
            <div className="center">
                <h1>Orion Breeding Tool</h1>
                 <p>This tool gives you the ability to cross different parents based 
                   on traits and figure out the outcome. Based on the outcome, 
                     you will be able to make decisions on what to cross</p>

             <div style={{display:"flex", margin:"8em"}}>
             <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Program
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown style={{marginLeft:"4em", }}>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Sub-Program
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown style={{marginLeft:"4em"}}>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Traits
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </div>
             <div>
             <Button onClick={this.routeChange}
                    className="glow-on-hover" >Get Started</Button>
          
             
            </div>
            </div>
        );
      }

}