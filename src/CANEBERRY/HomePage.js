import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from "react-switch";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from "@restart/ui/esm/Button";
import { Link, browserHistory , withRouter} from "react-router-dom";
import { Dropdown } from "react-bootstrap";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
     padding: theme.spacing(1),
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
    width: '50%'
  }));


export default class HomePage extends Component{
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
           <div>Crane</div>
        );
      }

}