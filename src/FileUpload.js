import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Box, CircularProgress } from "@material-ui/core";
import { get } from "jquery";
import { groupBy } from "@progress/kendo-data-query";
import ReactDOM from "react-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CSVLink } from "react-csv";
import { FaEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { element } from "prop-types";

var prescriptionData = [];
var finalPrescription = [];
var finalRowList = [];
var getRow = [];
var hhh = [];
var finished = false;
var dataa = [];
var dataToWorkWith = [];
var secondData = [];
var dataLength;
var soloData = {};
var newRow;

const headers = [
  { label: "Cross ID", key: "crossId" },
  { label: "Parent 1", key: "parent1" },
  { label: "Parent 2", key: "parent2" },
  { label: "Num of Seedlings", key: "numofseed" },
  { label: "Cost", key: "cost" },
  { label: "Prescription", key: "prescription" },
  { label: "Forecast", key: "forecast" },
];

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: this.props.fileLines,
      loading: true,
      finalLines: [],
      tableItems: [],
      showModal: false,
      editData: {},
      id: "",
      crossId: "",
      numofseed: "",
      parent1: "",
      parent2: "",
      prescription: "",
    };
    this.getTable = this.getTable.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props.fileLines, this.props.clientID, this.props.traits);
    this.getTable();
    getRow.length = 0;
    console.log("mounted");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tableItems !== this.state.tableItems) {
      console.log("done");
      //   getRow = newRow
      this.setState({ loading: false });
    }
  }
  async nextStage(datas) {
    let getNewData = [];
    for (const element in this.props.traits) {
      var rowList = {};

      try {
        const res = await Promise.all([
          axios.get(
            "/api/v1/haplotype_two_parents/" +
              this.props.clientID +
              "&" +
              datas.parent1 +
              "&" +
              datas.parent2 +
              "&" +
              this.props.traits[element].value
          ),
        ]);

        const res1 = await Promise.all([
          axios.get(
            "/api/v1/haplotype_forecast/" +
              this.props.clientID +
              "&" +
              datas.parent1 +
              "&" +
              datas.parent2 +
              "&" +
              this.props.traits[element].value
          ),
        ]);
        finalPrescription.length = 0;

        const data = res.map((res) => res.data);
        const data1 = res1.map((res1) => res1.data);
        soloData = {
          allele: data.flat(),
          forecast: data1.flat(),
          trait: this.props.traits[element].label,
        };

        const getPrescriptions = soloData.allele.filter(
          (character) => character.compare === "none"
        );
        var prescribedAllele = getPrescriptions;

        var seedling = datas.numofseed;
        var crossId = datas.crossId;
        var parent1 = datas.parent1;
        var parent2 = datas.parent2;
        prescribedAllele.forEach((prescription) => {
          finalPrescription.push(prescription.marker);
        });

        var sampleCost = (prescribedAllele.length * 0.3 * seedling).toFixed(2);

        //ForeCast--------------------------
        var arrWithForecast = soloData.forecast.map((object) => {
          return {
            x: Object.keys(object).join(),
            value: Object.values(object).join(),
          };
        });
        //   console.log(arrWithForecast)
        let obj = soloData.forecast.find((o) => o.forecast);

        var refinedForecast = arrWithForecast.map((object) => {
          return {
            x: object.x,
            value: object.value / 10 + " %",
            forecast: Object.values(obj).join(),
          };
        });
        var newForecast = refinedForecast.reduce(
          (data, item) =>
            Object.assign(data, Object.values(obj), {
              [item.x]: item.value,
            }),
          {}
        );

        function renameKeys(obj, newKeys) {
          const keyValues = Object.keys(obj).map((key) => {
            const newKey = newKeys[key] || key;
            return { [newKey]: obj[key] };
          });
          return Object.assign({}, ...keyValues);
        }
        const newKeys = { 0: "Forecast" };
        const renamedObj = renameKeys(newForecast, newKeys);
        //   console.log(renamedObj)
        delete renamedObj.forecast;

        var stringifiedObj = Object.entries(renamedObj)
          .map((x) => x.join(":"))
          .join("     ");

        rowList = {
          id: getRow.length,
          crossId: crossId,
          parent1: parent1,
          parent2: parent2,
          numofseed: seedling,
          cost: sampleCost,
          prescription: finalPrescription.join(" "),
          forecast: stringifiedObj,
          trait: this.props.traits[element].label,
        };
        console.log(rowList);
        getRow.push(rowList);
      } catch {
        throw Error("Promise failed");
      }
    }
    if (getRow.length === dataLength * this.props.traits.length) {
      console.log("done");
      this.setState({
        tableItems: groupBy(getRow, [{ field: "trait" }]),
      });
      console.log(this.state.tableItems);
      console.log(getRow);

      this.setState({ loading: false });
    }
  }
  editRow(data) {
    console.log(data.prescription.split(" "));
    this.setState({
      editData: data,
    });
    this.openModal();
  }

  openModal = () => this.setState({ showModal: true });

  closeModal = () => this.setState({ showModal: false });

  onInputchange(evt) {
    evt.preventDefault();
    console.log("new value", evt.target.value);
    // this.setState({
    //     editData: evt.target.value
    // })
  }

  handleSubmit(event) {
    event.preventDefault();
    var id = this.state.editData.id;
    var cross = document.getElementById("crossid").value;
    var parent1 = document.getElementById("parent1").value;
    var parent2 = document.getElementById("parent2").value;
    var cost = document.getElementById("cost").value;
    var presc = document.getElementById("presc").value;
    var numSeed = document.getElementById("num").value;
    var costpresc = this.state.editData.prescription.split(" ").length;
    var sampleCost = (costpresc * 0.3 * numSeed).toFixed(2);
    console.log(costpresc);
    console.log(sampleCost);

    var newData = [
      {
        id: id,
        crossId: cross,
        parent1: parent1,
        parent2: parent2,
        cost: sampleCost,
        prescription: presc,
        numofseed: numSeed,
        forecast: this.state.editData.forecast,
      },
    ];

    const result = getRow.map((x) => {
      const item = newData.find(({ id }) => id === x.id);
      return item ? item : x;
    });
    console.log(result);
    console.log(getRow);

    console.log({
      id: id,
      crossId: cross,
      parent1: parent1,
      parent2: parent2,
      cost: sampleCost,
      prescription: presc,
      numofseed: numSeed,
    });

    getRow = result;
    this.setState({
      tableItems: groupBy(getRow, [{ field: "trait" }]),
    });
  }

  onSaveEdit() {
    console.log(this.state.editData);
  }

  filterRows = (id) => {
    newRow = getRow.filter((row) => {
      console.log(row.id);
      return row.id !== id;
    });
    console.log(newRow);
    getRow = newRow;
    this.setState({
      tableItems: groupBy(newRow, [{ field: "trait" }]),
    });
    console.log(getRow);
  };
  getTable() {
    let promises = [];
    this.props.fileLines.map((data) => {
      console.log(data);
      dataLength = data.length;
      data.map((el) => {
        console.log(el);
        this.nextStage(el);
      });
    });
  }

  render() {
    let table;

    if (this.state.loading) {
      return (
        <Box sx={{ width: '100%' }}>
          <CircularProgress />
        </Box>
      );;
    } else {
      table = this.state.tableItems.map((index) => (
        <>
          <div className="container">
            <h3>Cross List for {index.value}</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Cross ID</th>
                  <th>Parent 1</th>
                  <th>Parent 2</th>
                  <th>Num of Seedlings</th>
                  <th>Prescription</th>
                  <th>Cost($)</th>
                  <th>Forecast</th>
                </tr>
              </thead>
              <tbody>
                {index.items.map((data) => (
                  <tr key={data.id}>
                    <td>{data.crossId}</td>
                    <td>{data.parent1}</td>
                    <td>{data.parent2}</td>
                    <td>{data.numofseed}</td>
                    <td>{data.prescription}</td>
                    <td>{data.cost}</td>
                    <td>{data.forecast}</td>
                    {/* <td>
                      <FaEdit onClick={() => this.editRow(data)}></FaEdit>
                    </td> */}
                    <td>
                      <RiDeleteBin6Line
                        onClick={() => this.filterRows(data.id)}
                      ></RiDeleteBin6Line>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ));
    }
    return (
      <>
        <div>{table}</div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Cross {this.state.editData.crossId}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Cros ID
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="crossid"
                  aria-describedby="emailHelp"
                  defaultValue={this.state.editData.crossId}
                  onChange={(e) =>
                    this.setState({
                      ...this.state.editData,
                      crossId: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Parent 1
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="parent1"
                  defaultValue={this.state.editData.parent1}
                  onChange={(e) =>
                    this.setState({
                      ...this.state.editData,
                      parent1: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Parent 2
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="parent2"
                  defaultValue={this.state.editData.parent2}
                  onChange={(e) =>
                    this.setState({
                      ...this.state.editData,
                      parent2: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Num of Seedlings
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="num"
                  defaultValue={this.state.editData.numofseed}
                  onChange={(e) =>
                    this.setState({
                      ...this.state.editData,
                      numofseed: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Cost
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="cost"
                  defaultValue={this.state.editData.cost}
                  onChange={(e) =>
                    this.setState({
                      ...this.state.editData,
                      cost: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Prescription
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="presc"
                  defaultValue={this.state.editData.prescription}
                ></input>
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </Modal.Body>
        </Modal>

        <CSVLink
          className="btn btn-primary"
          data={getRow}
          headers={headers}
          filename={"Cros List"}
        >
          Download to CSV
        </CSVLink>
      </>
    );
  }
}
