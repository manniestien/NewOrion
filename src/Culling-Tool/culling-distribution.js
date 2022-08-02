import React, { Component } from "react";
import { Redirect } from "react-router";





export default class Distribution extends Component {
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
}
