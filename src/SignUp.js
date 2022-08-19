import React, { Component, PropTypes } from "react";
import { Paper, TextField } from "@mui/material";
import { Button } from "@material-ui/core";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import emailjs from "emailjs-com";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import orion from "./asserts/ORION_03142022.png"

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      emailErrorText: "",
      password: "",
      username: "",
    };
  }

  validateEmail(e) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(e);
  }

  getStyle() {
    return {
      height: 600,
      width: 500,
      margin: 20,
      textAlign: "center",
      display: "inline-block",
    };
  }

  _onSubmit(e) {
    e.preventDefault();

    var templateParams = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      name: "Dr. Hermilo Hernandez",
      reply_to: this.state.email,
    };

    emailjs.init("oNGLD-YJgj0mrG4a_");

    emailjs.send("service_q4wnq3o", "template_2d5pesh", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        if (response.status === 200) {
          swal({
            title: "Request Sent",
            text: "You will receive an email from Dr Hermilo Hernamdez after access has been grated",
            icon: "success",
            button: "Ok",
          }).then((okay) => {
            if (okay) {
              window.location = "/";
            } else {
              window.location = "/";
            }
          });
        }
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _onReset() {
    console.log("_onReset");
    this.setState({
      account: "",
      email: "",
      emailErrorText: "",
      password: "",
      confirmPassword: "",
      confirmPasswordErrorText: "",
      telNum: "",
    });
  }

  _handleAccountChange(e, val) {
    this.setState({ account: val });
  }

  _handlePasswordChange(e, val) {
    this.setState({ password: val });
  }

  _handleUserNameChange(e, val) {
    this.setState({
      username: val,
    });
  }

  _handleEmailChange(e, val) {
    var errorText = "";
    if (!this.validateEmail(val)) {
      errorText = "Email Format Error";
    }
    this.setState({ emailErrorText: errorText, email: val });
  }

  _handleInputChange(telNumber, selectedCountry) {
    console.log(
      "input changed. number: ",
      telNumber,
      "selected country: ",
      selectedCountry
    );
  }

  _handleInputBlur(telNumber, selectedCountry) {
    console.log(
      "Focus off the ReactTelephoneInput component. Tel number entered is: ",
      telNumber,
      " selected country is: ",
      selectedCountry
    );
    this.setState({ telNum: telNumber });
  }

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
                          Sign up
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
                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                              <input
                                class="form-control"
                                type="eamil"
                                name="email"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.onChange}
                              />
                              <label class="form-label" for="form3Example3c">
                                Your Email
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
                             Have an account already? {" "}
                              <a href="/">Login here</a>
                            </label>
                          </div>

                          <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="button"
                              class="btn btn-primary btn-lg"
                              onClick={this._onSubmit.bind(this)}
                            >
                             Sign Up
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
