import React, { Component } from "react";
import { withRouter } from "react-router-dom";  // new import 
import { connect } from "react-redux";          // new import 
import PropTypes from "prop-types";             // new import 
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
 import Psi from "./HomePage";
import orion from "./asserts/ORION_03142022.png";


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
  // componentDidMount(){
  //  const userData = {
  //    username: 'emmanuel',
  //    password: 'Nanayaw@20',

  //  };
  //  this.props.login(userData, "/Select-Tool"); // <--- login request
  // //  this.props.history.push("/Select-Tool");
  // }

  onLoginClick = () => {
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    localStorage.setItem('username', this.state.username)
    localStorage.setItem("password", this.state.password);
    this.props.login(userData, "/Select-Tool"); // <--- login request
     this.props.history.push("/Select-Tool");
  };
  render() {
    return (
      <>
      <section class="vh-100" style={{ backgroundColor: "#eee" }}>
          <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-lg-12 col-xl-11">
                <div class="card text-black" style={{ borderRadius: "25px" }}>
                  <div class="card-body p-md-5">
                    <div class="row justify-content-center">
                      <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Login
                        </p>

                        <form class="mx-1 mx-md-4">
                          <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                              <input
                                class="form-control"
                                type="text"
                                name="username"
                                placeholder="Enter user name"
                                value={this.state.username}
                                onChange={this.onChange}
                              />
                              <label class="form-label" for="form3Example1c">
                                Username
                              </label>
                            </div>
                          </div>
                          <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                              <input
                                class="form-control"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={this.state.password}
                                onChange={this.onChange}
                              />
                              <label class="form-label" for="form3Example4c">
                                Password
                              </label>
                            </div>
                          </div>
                          <div class="form-check d-flex justify-content-center mb-5">
                            {/* <input
                              class="form-check-input me-2"
                              type="checkbox"
                              value=""
                              id="form2Example3c"
                            /> */}
                            <label class="form-check-label">
                             Don't have an account? {" "}
                              <a href="/signup">Sign Up</a>
                            </label>
                          </div>

                          <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="button"
                              class="btn btn-primary btn-lg"
                              onClick={this.onLoginClick}
                            >
                             Sign In
                            </button>
                          </div>
                        </form>
                      </div>
                      <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src={orion}
                          class="img-fluid"
                          alt="Sample image"
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </>
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