import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { styled } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@restart/ui/esm/Button";
import Select from "react-select";
import "./home.css";
import axios from "axios";
import PropTypes from "prop-types";
import { getUsers } from "./LoginActions";
import { getClientTraits } from "./LoginActions";
import { connect } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
  backgroundColor: "transparent",
  width: "50%",
}));



axios.defaults.baseURL = "http://192.168.128.237:8002/";
var traits = []
var crops = []
var markers = []

var clientsss = []
export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptionSub: null,
      selectedOptionTrait: null,
      selectedOptionCrop: null,
      selectedOptionMarker: null,
      selectedFile: null,
      selectValue: null,
      data: [],
      clients: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.routeChange = this.routeChange.bind(this);
    // this.handleChangeTrait = this.handleChangeTrait.bind(this)
  }
  componentDidMount() {
    this.props.getUsers();
    
    
  }
  componentWillUpdate() {
    this.props.getClientTraits();
    const clientsID = this.props.clientsID;
    
    // console.log(clientsID)
  }

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
// axios
//   .get("/api/v1/assaypositions/" + this.state.selectedOptionSub.value + "&" + this.stateselectedOptionTrait.value)
//   .then((response) => {
//     console.log(response.data);
//     var markerss = response.data;
//     markers = response.data.map(function (trait) {
//       return { value: trait.id, label: trait.prescription };
//     });
//     localStorage.setItem("markers", markers);
//     this.setState({ data: response.data });
//   })

//   .catch((error) => {});
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
    console.log(searchParams.toString());
    this.props.history.push("/cross/?" + searchParams.toString());
    console.log(this.state.data)
    markers = this.state.selectedOptionTrait;
    localStorage.setItem('traits', JSON.stringify(this.state.selectedOptionTrait))
   // const data = new FormData();
   // data.append("file", this.state.selectedFile);
    
  };;

  handleChange = (selectedOptionSub) => {
    this.setState({ selectedOptionSub });
    console.log(`Option selected:`, selectedOptionSub.value);
    localStorage.setItem('clientID', selectedOptionSub.value)
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
    var clientId = localStorage.getItem('clientID')
    var cropId = localStorage.getItem("cropID");


    axios
      .get(
        "/api/v1/prescriptions/" +
          clientId +
          "&" +
          selectedOptionCrop.value
      )
      .then((response) => {
        console.log(response.data);
       
        traits = response.data.map(function (trait) {
          return { value: trait.id, label: trait.prescription };
        });
      })
      .catch((error) => {});
  };

  handleTraits = (selectedOptionTrait) => {
    this.setState({ selectedOptionTrait });
    console.log(`Option selected:`, selectedOptionTrait.value);
    var clientId = localStorage.getItem("clientID");
    localStorage.setItem("traitID", selectedOptionTrait);
    var self = this;
    
  };

  

  

  render() {
    //this.getClii()
    const { selectedOptionSub } = this.state;
    const { selectedOptionCrop } = this.state;
    const { selectedOptionTrait } = this.state;
    const { selectedOptionMarker } = this.state;
    const { clients } = this.props.clients;
    let options = clients.map(function (city) {
      return { value: city.id, label: city.client_name };
    });
    return (
      <div className="center">
        <h1>Orion Breeding Tool</h1>

        <p>
          This tool gives you the ability to cross different parents based on
          traits and figure out the outcome. Based on the outcome, you will be
          able to make decisions on what to cross
        </p>

        <div className="drops">
          <Select
            className="subProg"
            options={options}
            placeholder="Select Sub-Program"
            onChange={this.handleChange}
            value={selectedOptionSub}
          />

          <Select
            className="traits"
            options={crops}
            placeholder="Select Crop"
            onChange={this.handleChangeCrop}
            value={selectedOptionCrop}
          />
          <Select
            isMulti={true}
            className="traits"
            options={traits}
            placeholder="Select Trait"
            onChange={this.handleTraits}
            value={selectedOptionTrait}
          />
        </div>
        <div className="custom-file">
          <label className="form-label"></label>
          <input
            type="file"
            className="form-control"
            id="customFile"
            name="file"
            onChange={this.onChangeHandler}
          />
        </div>

        <div>
          <Button onClick={this.onClickHandler} className="glow-on-hover">
            Get Started
          </Button>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  clients: PropTypes.object,
  clientTraits: PropTypes.object,
};

const mapStateToProps = (state) => ({ clients: state.clients, clientsID: state.clientTraits });

export default connect(mapStateToProps, {getUsers, getClientTraits})(HomePage)