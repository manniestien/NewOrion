import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardGroup } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import { withRouter, useHistory } from "react-router";
import { Redirect } from "react-router";
import OrionLogo from './asserts/ORION_03142022.png'
import BellaLogo from "./asserts/BELLA_031142022.png";
import './bridge.css'
import { Tooltip } from "@material-ui/core";


const longText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;

export default class Bridge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectOrion: false,
      redirectBella: false,
    };
  }

  setRedirectToOrion = () => {
    this.setState({
      redirectOrion: true,
    });
  };

  setRedirectToBella = () => {
    this.setState({
      
      redirectBella: true,
    });
  };

  renderRedirectOrion = () => {
    if (this.state.redirectOrion) {
      return <Redirect to="/Orion" />;
    }
  };

  renderRedirectBella = () => {
    if (this.state.redirectBella) {
      return <Redirect to="/culling-tool" />;
    }
  };

  render() {
    return (
      <>
        <section class="wrapper">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-4">
                <div
                  id="bridge"
                  class="card text-white card-has-bg click-col"
                  style={{
                    backgroundImage: `url(${OrionLogo})`,
                  }}
                >
                  <div class="card-img-overlay d-flex flex-column">
                    <div class="card-body">
                      <Tooltip title={longText}>
                        <span>
                          <i
                            class="bi bi-info-circle"
                            style={{
                              fontSize: "1.5em",
                              float: "right",
                              marginTop: "-0.5em",
                            }}
                          ></i>
                        </span>
                      </Tooltip>
                    </div>
                    <div class="card-footer" onClick={this.setRedirectToOrion}>
                      <div class="media">
                        <div class="media-body">
                          {this.renderRedirectOrion()}
                          <h6 class="my-0 text-white d-block">
                            Click to use tool
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div
                  id="bridge"
                  class="card text-white card-has-bg click-col"
                  style={{ backgroundImage: `url(${BellaLogo})` }}
                >
                  <div class="card-img-overlay d-flex flex-column">
                    <div class="card-body">
                      <Tooltip title={longText}>
                        <span>
                          <i
                            class="bi bi-info-circle"
                            style={{
                              fontSize: "1.5em",
                              float: "right",
                              marginTop: "-0.5em",
                            }}
                          ></i>
                        </span>
                      </Tooltip>
                    </div>
                    <div class="card-footer" onClick={this.setRedirectToBella}>
                      <div class="media">
                        <div class="media-body">
                          {this.renderRedirectBella()}
                          <h6 class="my-0 text-white d-block">
                            Click to use tool
                          </h6>
                        </div>
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






