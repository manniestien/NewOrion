import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import PSI from "./PSI/HomePage";
import CRANEBERRY from "./CANEBERRY/HomePage";
import MORSON from "./MORSON_CORS/HomePage";
import CDG from "./CDG/HomePage";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { PropTypes } from 'react-redux'
import  { login }from './LoginActions'
import { withRouter } from "react-router-dom"; // new import
import { connect } from "react-redux";          // new import 






class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this)
    this.onLoginClick = this.onLoginClick.bind(this)
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLoginClick = () => {
    var userData = {
      username: this.state.username,
      password: this.state.password,
    };
     console.log(userData);
    this.props.login(userData, "/PSI"); 
  }
 
  

  render() {
    return (
      <Container>
        <Form>
          <Form.Group controlId="usernameId">
            <Form.Label>User name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter user name"
              value={this.state.username}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId="passwordId">
            <Form.Label>Your password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </Form.Group>
        </Form>
        <br></br>
        <Button variant="danger" onClick={this.onLoginClick}>
          Login
        </Button>
      </Container>
    );
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth,
});


  
