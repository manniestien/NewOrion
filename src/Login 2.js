import React, { Component } from "react";
import { withRouter } from "react-router-dom";  // new import 
import { connect } from "react-redux";          // new import 
import PropTypes from "prop-types";             // new import 
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import Psi from "./PSI/HomePage";

import { login } from "./LoginActions.js";      // new import 

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLoginClick = () => {
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    localStorage.setItem('username', this.state.username)
    localStorage.setItem("password", this.state.password);
    this.props.login(userData, '/Orion'); // <--- login request
     this.props.history.push("/Orion")
  };
  render() {
    return (
      <Container>
        <Row>
          <Col md="4">
            <br></br>
            <h1>Login</h1>
            <br></br>
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
            <p className="mt-2">
              <br></br>
              Don't have account?{" "}
              <Link to="/signup" style={{ color: "red" }}>
                Signup
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

// connect action and store and component
Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  login
})(withRouter(Login));