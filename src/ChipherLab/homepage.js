// import React, { Component } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
// import Button from "@restart/ui/esm/Button";
// import Select from "react-select";
// import "../home.css";
// import axios from "axios";

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: "white",
//   backgroundColor: "transparent",
//   width: "50%",
// }));

// const SubProgram = [
//   { label: "OP", value: 355 },
//   { label: "EU", value: 54 },
//   { label: "USA", value: 43 },
// ];
// const traits = [
//   { label: "FUS", value: 355 },
//   { label: "COLMAC", value: 54 },
//   { label: "ROM", value: 43 },
// ];
// export const getUser = () => {
//   return async (dispatch) => {
//     axios
//       .get("/api/v1/administrate")
//       .then((res) => {
//         console.log(res.data);
//        // localStorage.setItem("auth", res.data.authenticated);
//         dispatch({ res });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };



// export default class HomePage extends Component {
//   constructor() {
//     super();
//     this.state = {
//       selectedOptionSub: null,
//       selectedOptionTrait: null,
//       selectedFile: null,
//       selectValue: null,
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.routeChange = this.routeChange.bind(this);
//   }

//   handleChange(checked) {
//     this.setState({ checked });
//   }

//   componentDidMount() {
//       getUser()
//   }

//   routeChange() {
//     this.props.history.push("/cross");
//   }
//   onChangeHandler = (event) => {
//     this.setState({
//       selectedFile: event.target.files[0],
//       loaded: 0,
//     });
//     console.log(event.target.files[0]);
//   };
//   onClickHandler = () => {
//     const data = new FormData();
//     data.append("file", this.state.selectedFile);
//     this.props.history.push(
//       `/PSI&${this.state.selectedOptionSub.label}&${this.state.selectedOptionTrait.label}`
//     );
//     const base = (axios.defaults.baseURL = "http://192.168.128.237:8000/");
//     base.get("/api/v1/adminitrae");
//   };

//   handleChange = (selectedOptionSub) => {
//     this.setState({ selectedOptionSub });
//     console.log(`Option selected:`, selectedOptionSub);
//   };
//   handleChangeTrait = (selectedOptionTrait) => {
//     this.setState({ selectedOptionTrait });
//     console.log(`Option selected:`, selectedOptionTrait);
//     this.getClients();
//   };

//   render() {
//     const { selectedOptionSub } = this.state;
//     const { selectedOptionTrait } = this.state;
//     return (
//       <div className="center">
//         <h1>Orion Breeding Tool</h1>
//         <p>
//           This tool gives you the ability to cross different parents based on
//           traits and figure out the outcome. Based on the outcome, you will be
//           able to make decisions on what to cross
//         </p>

//         <div className="drops">
//           <Select
//             className="subProg"
//             options={SubProgram}
//             placeholder="Select Sub-Program"
//             onChange={this.handleChange}
//             value={selectedOptionSub}
//           />

//           <Select
//             className="traits"
//             options={traits}
//             placeholder="Select Trait"
//             onChange={this.handleChangeTrait}
//             value={selectedOptionTrait}
//           />
//         </div>
//         <div className="custom-file">
//           <label className="form-label"></label>
//           <input
//             type="file"
//             className="form-control"
//             id="customFile"
//             name="file"
//             onChange={this.onChangeHandler}
//           />
//         </div>

//         <div>
//           <Button onClick={this.onClickHandler} className="glow-on-hover">
//             Get Started
//           </Button>
//         </div>
//       </div>
//     );
//   }
// }
