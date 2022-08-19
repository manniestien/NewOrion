import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../LoginActions";
import { getClientTraits } from "../LoginActions";
import { Redirect } from "react-router";
import bella from '../asserts/favicon 2.ico'




axios.defaults.baseURL = "http://65.155.58.188:3000/";
var traits = [];
var crops = [];
var markers = [];
var categories = []
var cullFigure = ''
var newCategories = []
var seedlingsData = []
const seasonOption = [{label:'Summer', value:'1'}, {label:'Spring', value:'2'}]



export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptionSub: null,
      selectedOptionTrait: null,
      selectedOptionCrop: null,
      selectedOptionMarker: null,
      selectedOptionSeason: null,
      selectedFile: null,
      selectValue: null,
      data: [],
      clients: [],
      redirectDistri: false,
    };
    this.hostStyle = {
      width: "100%",
      height: "600px",
    };
    this.handleChange = this.handleChange.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }

  setRedirectToDistribution = () => {
    this.setState({
      redirectDistri: true,
    });
  };

  renderRedirectDistribution = () => {
    if (this.state.redirectDistri) {
      return <Redirect to="/distribution" />;
    }
  };

  getFaviconEl() {
    return document.getElementById("favicon");
  }

  handleFavicon() {
    const favicon = this.getFaviconEl(); // Accessing favicon element
    favicon.href = bella;
  }
  componentDidMount() {
    this.handleFavicon()
    document.title = "BELLA";

    this.props.getUsers();
  }

  componentWillUpdate() {
    this.props.getClientTraits();
    const clientsID = this.props.clientsID;

    // console.log(clientsID)
  }

  getExcelData() {}

  routeChange() {
    this.props.history.push("/cross");
  }
  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
    console.log(event.target.files[0]);
  };

  onClickHandler = () => {
    seedlingsData.length = 0;
    console.log(localStorage.getItem("markers"));
    console.log(this.state.selectedOptionTrait);
    localStorage.setItem(
      "priscribe",
      JSON.stringify(this.state.selectedOptionTrait)
    );
    const searchParams = new URLSearchParams();
    searchParams.append("prog", this.state.selectedOptionSub.label);
    searchParams.append("crop", this.state.selectedOptionCrop.label);
    searchParams.append("traits", this.state.selectedOptionTrait.label);
    console.log(this.state.data);
    markers = this.state.selectedOptionTrait;
    localStorage.setItem(
      "traits",
      JSON.stringify(this.state.selectedOptionTrait)
    );
    console.log(newCategories);

    var catData = newCategories.categories;
    console.log(catData);
    var catId = "";
    var parentDiv = document.getElementById("catButtons");
    var childDiv = document.getElementById("submit");
    if (parentDiv.contains(childDiv)) {
      document.getElementById("catButtons").innerHTML = "";
    } else {
      document.getElementById("catButtons");
    }
    for (var i = 0; i < catData.length; i++) {
      var radiobox = document.createElement("input");
      radiobox.type = "checkbox";
      radiobox.id = catData[i];

      radiobox.className = "btn-check";
      radiobox.value = catData[i];
      radiobox.name = "options";

      var label = document.createElement("label");
      label.htmlFor = catData[i];

      if (catData[i] === "L") {
        var description = document.createTextNode("LOW");
      } else if (catData[i] === "M") {
        var description = document.createTextNode("MEDIUM");
      } else if (catData[i] === "H") {
        var description = document.createTextNode("HIGH");
      } else if (catData[i] === "S") {
        var description = document.createTextNode("Susceptible");
      } else if (catData[i] === "MS") {
        var description = document.createTextNode("Moderate Susceptible");
      } else if (catData[i] === "R") {
        var description = document.createTextNode("Resistant");
      } else if (catData[i] === "MR") {
        var description = document.createTextNode("Moderate Resistant");
      }
      label.appendChild(description);
      label.className = "btn btn-outline-secondary";
      label.id = "submit";

      var newline = document.createElement("br");

      var container = document.getElementById("catButtons");
      container.appendChild(radiobox);
      container.appendChild(label);
      container.appendChild(newline);
      document.getElementById("seedling-data").style.display = "flex";
    }
  };

  sendSeedlings() {
    seedlingsData.length = 0;
    var checkboxes = document.getElementsByName("options");
    for (var checkbox of checkboxes) {
      if (checkbox.checked) {
        seedlingsData.push(checkbox.value);
        // document.body.append(checkbox.value + " ");
      }
    }

    console.log(seedlingsData);
    document.getElementById("seedTable").style.display = "block";
  }

  handleChange = (selectedOptionSub) => {
    this.setState({ selectedOptionSub });
    console.log(`Option selected:`, selectedOptionSub.value);
    localStorage.setItem("clientID", selectedOptionSub.value);
    axios
      .get("/api/v1/crops/" + selectedOptionSub.value)
      .then((response) => {
        console.log(response.data);
        crops = response.data.map(function (crop) {
          return { value: crop.id, label: crop.crop };
        });
      })
      .catch((error) => {});
  };

  handleChangeCrop = (selectedOptionCrop) => {
    this.setState({ selectedOptionCrop });
    console.log(`Option selected:`, selectedOptionCrop.value);
    var clientId = localStorage.getItem("clientID");
    var cropId = localStorage.getItem("cropID");

    axios
      .get("/api/v1/prescriptions/" + clientId + "&" + selectedOptionCrop.value)
      .then((response) => {
        console.log(response.data);
        // if(response.data.filter(e => e.prescription === cullFigure)){
        //     categories.push()
        // }
        categories = response.data;

        traits = response.data.map(function (trait) {
          return { value: trait.id, label: trait.prescription };
        });
      })
      .catch((error) => {});
  };

  handleTraits = (selectedOptionTrait) => {
    this.setState({ selectedOptionTrait });
    console.log(`Option selected:`, selectedOptionTrait.label);
    var clientId = localStorage.getItem("clientID");
    cullFigure = selectedOptionTrait.label;
    localStorage.setItem("traitID", selectedOptionTrait);
    var self = this;
    var data = categories.find(function (ele) {
      return ele.prescription === cullFigure;
    });
    console.log(data);
    newCategories = data;
  };

  handleSeason = (selectedOptionSeason) => {
    this.setState({ selectedOptionSeason });
    console.log(`Option selected:`, selectedOptionSeason.label);
  };

  render() {
    const { selectedOptionSub } = this.state;
    const { selectedOptionCrop } = this.state;
    const { selectedOptionTrait } = this.state;
    const { selectedOptionSeason } = this.state;
    const { selectedOptionMarker } = this.state;
    const { clients } = this.props.clients;
    let options = clients.map(function (city) {
      return { value: city.id, label: city.client_name };
    });
    return (
      <>
        <div
          style={{ display: "flex", paddingTop: "2em" }}
          className="container"
        >
          <div style={{ marginRight: "12px" }} className="row ">
            <div className="col- mx-auto">
              <div className="card shadow border">
                <div className="card-header">... Culling Tool For ......</div>
                <div className="card-body d-flex flex-column align-items-center">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <div className="drops">
                    <Select
                      style={{ marginRight: "12px" }}
                      id="sub-drops"
                      className="subProg"
                      options={options}
                      placeholder="Select Sub-Program"
                      onChange={this.handleChange}
                      value={selectedOptionSub}
                    />

                    <Select
                      style={{ marginRight: "12px" }}
                      className="traits"
                      options={crops}
                      placeholder="Select Crop"
                      onChange={this.handleChangeCrop}
                      value={selectedOptionCrop}
                    />
                    <Select
                      style={{ marginRight: "12px" }}
                      className="traits"
                      options={traits}
                      placeholder="Select Trait"
                      onChange={this.handleTraits}
                      value={selectedOptionTrait}
                    />
                    <Select
                      style={{ marginRight: "12px" }}
                      className="traits"
                      options={seasonOption}
                      placeholder="Select Season"
                      onChange={this.handleSeason}
                      value={selectedOptionSeason}
                    />
                  </div>
                  <div>
                    <div style={{ display: "flex", marginTop: "2em" }}>
                      <button
                        onClick={this.onClickHandler}
                        className="btn btn-outline-secondary"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="seedling-data" style={{ display: "none" }} className="row">
            <div className="col- mx-auto">
              <div className="card shadow border">
                <div className="card-header">
                  {"Culling Tool For" + " " + cullFigure}
                </div>

                <div id="cull" className="card-body d-flex flex-column ">
                  <p className="card-text">
                    Select one or more buttons below to KEEP seedlings from the
                    program
                  </p>
                  <div style={{ display: "flex" }}>
                    <div
                      className="btn-group"
                      role="group"
                      id="catButtons"
                      aria-label="Basic checkbox toggle button group"
                    ></div>
                  </div>

                  <div style={{ display: "flex", marginTop: "2.5em" }}>
                    <div style={{ marginRight: "12px" }} className="col-auto">
                      <label htmlFor="percentKeep" className="visually-hidden">
                        Password
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="percentKeep"
                        placeholder="Percent Keep"
                      ></input>
                    </div>
                    <div className="col-auto">
                      <label htmlFor="percentCull" className="visually-hidden">
                        Password
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="percentCull"
                        placeholder="Percent Cull"
                      ></input>
                    </div>
                  </div>
                  <div style={{ display: "flex", marginTop: "2em" }}>
                    <button
                      onClick={this.sendSeedlings}
                      className="btn btn-outline-primary"
                    >
                      Select Seedlings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ marginTop: "18px", display: "none" }}
          className="container"
          id="seedTable"
        >
          <div className="row ">
            <div style={{ paddingTop: "2em" }} className="col- mx-auto">
              <div className="card shadow border">
                <div className="card-header">
                  <h6> Culling Summary Table</h6>
                  <p> Number of seedlings kept/culled by cross</p>
                </div>

                <div className="card-body d-flex flex-column ">
                  <div className="tables">
                    <table id="csvfus" className="table table-hover ">
                      <thead>
                        <tr>
                          <th scope="col">Cross ID</th>
                          <th scope="col">Cross % Keep</th>
                          <th scope="col">Seedlings Kept</th>
                          <th scope="col">Seedlings Culled</th>
                          <th scope="col">Number of Seedlings</th>
                        </tr>
                      </thead>
                      <tbody id="csv"></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Home.propTypes = {
  clients: PropTypes.object,
  clientTraits: PropTypes.object,
};
const mapStateToProps = (state) => ({ clients: state.clients, clientsID: state.clientTraits });

export default connect(mapStateToProps, {getUsers, getClientTraits})(Home)

