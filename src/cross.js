/* eslint-disable no-loop-func */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  TextField,
  Paper,
  Card,
  Grid,
  Box,
  ListItem,
  CircularProgress,
} from "@material-ui/core";
import "./cross.css";
import AnyChart from "anychart-react";
import ReactDOMServer from "react-dom/server";
import $ from "jquery";
import Select from "react-select";
import anychart from "anychart";
import swal from "sweetalert";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";
import Spinner from "react-bootstrap/Spinner";
import BuildChart from "./BuildChart";
import FileUpload from "./FileUpload";
import { Button } from "@mui/material";

const options = [
  { value: "column", label: "Column Chart" },
  { value: "line", label: "Line Chart" },
  { value: "scatter", label: "Scatter Plot" },
  { value: "area", label: "Area Chart" },
];

//vars for various data

var markers = [];
var parents = [];
let parentss = [];
var allele_states1 = [];
var combinedData;
var switchedData2;

var allele_states2 = [];
var tHead = [];
var newData = [];
var newArray = [];
var newAllele = [];
var tableData1 = [];
var tableData2 = [];
var dataVal1 = null;
var dataVal2 = null;
var checked = [];
var charts = [];
var nones = [];
var crossTableForecast = [];
var xpoData = [];
var loading = false;
var swtched = [];
var pres = [];
var markerChecks = [];
var alleleTable1 = [];
var alleleTable2 = [];
var rightId;

// var getCast = false;

export default class Cross extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      analys: false,
      checked1: null,
      checked2: null,
      markers: null,
      parent1: null,
      parent2: null,
      data1: [],
      data2: [],
      traitsParent: [],
      allele1: [],
      allele2: [],
      checkMarkers: [],
      selectedOptionsP1: [],
      selectedOptionsP2: [],
      selected: false,
      selectedP2: false,
      showTablel: false,
      forecastArray: [],
      buildnewChart: [],
      sendChartProps: false,
      sendChartProps1: false,
    };
    this.getForecast = this.getForecast.bind(this);
    this.buildTable = this.buildTable.bind(this);
  }

  componentDidMount() {
    var myProp = this.props.myprop;

    console.log(this.props.location.lineData);
    document.title = "ORION";
    markers.length = 0;
    parentss.length = 0;
    parents.length = 0;
    var clientId = localStorage.getItem("clientID");
    var traitId = localStorage.getItem("traits");
    console.log(traitId);
    var newtttt = JSON.parse(traitId);
    console.log(newtttt);
    this.setState({ analys: true });
    // getCast = true;

    for (var i = 0; i < this.props.location.dddd.length; i++) {
      parentss.push(this.props.location.dddd[i]);
      // axios
      //   .get("/api/v1/assaypositions/" + clientId + "&" + newtttt[i].value)
      //   .then((response) => {
      //     parentss.push(response.data);
      console.log(parentss);
      console.log(this.state.analys);

      //   })
      //   .catch((error) => {});
    }
  }
  // componentDidUpdate(prevState, prevProps){
  //   if(prevState ==  this.state.buildnewChart){
  //     console.log(this.state.buildnewChart)
  //   }

  // }

  getMarkers() {
    // console.log(ss);
    tHead.length = 0;
    parents.length = 0;
    var clientId = localStorage.getItem("clientID");
    if (parentss.length === 0) {
      // swal("NO DATA YET");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, check data",
      });
    } else {
      let result = parentss[0].map((a) => a.id);
      console.log(result);
      // if (result.every((val, i, arr) => val === arr[0])) {
      //   // console.log("true");
      //   axios
      //     .get("/api/v1/haplotypeparent/" + clientId + "&" + result[0])
      //     .then((response) => {
      //        console.log(response.data);
      //       xpoData = response.data;
      //     })
      //     .catch((error) => {});
      // }
      for (var i = 0; i < parentss.length; i++) {
        let newParent = parentss[i];
        for (var j = 0; j < newParent.length; j++) {
          axios
            .get("/api/v1/haplotypeparent/" + clientId + "&" + newParent[j].id + "/")
            .then((response) => {
              parents.push(...response.data);
              console.log(response.data.length);
            })
            .catch((error) => {});
        }
      }
    }
  }

  getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }
  swapElements(array, source, dest) {
    return source === dest
      ? array
      : array.map((item, index) =>
          index === source ? array[dest] : index === dest ? array[source] : item
        );
  }

  buildTable() {
    try {
      combinedData = dataVal1 + dataVal2;
      console.log(combinedData);
      this.setState({ sendChartProps: true });
      newArray.length = 0;
      alleleTable1.length = 0;
      alleleTable2.length = 0;
      nones.length = 0;
      crossTableForecast.length = 0;
      var clientId = localStorage.getItem("clientID");
      var hhh = JSON.parse(localStorage.getItem("priscribe") || "[]");

      // const header = Object.keys(allele_states1[0]);
      var parentDiv = document.getElementById("showData");
      var childDiv = document.getElementById("tab");
      if (parentDiv.contains(childDiv)) {
        document.getElementById("showData").innerHTML = "";
      } else {
        document.getElementById("showData");
      }

      var checkss;
      var news = [];
      //build parent tables
      // eslint-disable-next-line no-sequences
      for (
        var a = 0, b = 0, j = 0, des = 0;
        a < allele_states1.length,
          b < allele_states2.length,
          j < hhh.length,
          des < parentss.length;
        a++, b++, j++, des++
      ) {
        console.log(checkss);
        let table = document.createElement("table");
        table.setAttribute(
          "class",
          "table table-hover table-bordered table-sm table-responsive card-1 p-4"
        );
        table.setAttribute("id", "tab");

        let thead = document.createElement("thead");
        thead.setAttribute("class", "thead-dark");
        let tbody = document.createElement("tbody");
        let row = document.createElement("tr");
        let idealHaplo = document.createElement("tr");
        let alleleRow1 = document.createElement("tr");
        alleleRow1.setAttribute("id", "category");
        let alleleRow2 = document.createElement("tr");
        alleleRow2.setAttribute("id", "category2");
        let checks = document.createElement("tr");

        var newTableData = [
          {
            marker: "Parent Name",
            rank: rightId,
            allele: dataVal1,
            ideal: "Ideal Haplotype",
          },
          ...allele_states1[a],
          {
            marker: "Category",
            rank: rightId,
            allele: allele_states1[a][1]["category"],
            ideal: "",
            category: "",
          },
        ];
        var newTableData1 = [
          { marker: "Parent Name", rank: rightId, allele: dataVal2 },
          ...allele_states2[b],
          {
            marker: "Category",
            rank: rightId,
            allele: allele_states2[b][1]["category"],
            ideal: "",
            category: "",
          },
        ];

        //  console.log(checked[m][1])
        console.log(newTableData);
        console.log(newTableData1);
        alleleTable1.push(newTableData);
        alleleTable2.push(newTableData1);
        console.log(alleleTable1);

        const ids = newTableData.map((o) => o.marker);
        const filtered = newTableData.filter(
          ({ marker }, index) => !ids.includes(marker, index + 1)
        );
        const ids2 = newTableData1.map((o) => o.marker);
        const filtered2 = newTableData1.filter(
          ({ marker }, index) => !ids2.includes(marker, index + 1)
        );

        console.log(filtered2);

        // eslint-disable-next-line no-loop-func
        filtered.forEach(function (marker) {
          let header = document.createElement("th");
          header.setAttribute("class", "ml-2");
          let alleleHeader = document.createElement("td");
          let allelehaplo = document.createElement("td");
          allelehaplo.setAttribute("id", "ideal");

          header.innerHTML = marker.marker;
          alleleHeader.innerHTML = marker.allele;
          allelehaplo.innerHTML = marker.ideal;
          row.appendChild(header);
          alleleRow1.appendChild(alleleHeader);
          idealHaplo.appendChild(allelehaplo);
          table.appendChild(thead);
          table.appendChild(tbody);
          thead.appendChild(row);
          tbody.appendChild(idealHaplo);
          tbody.appendChild(alleleRow1);
          // console.log(news);
        });

        // eslint-disable-next-line no-loop-func
        filtered2.forEach(function (allele) {
          let alleleHeader2 = document.createElement("td");
          alleleHeader2.innerHTML = allele.allele;
          alleleRow2.appendChild(alleleHeader2);
          tbody.appendChild(alleleRow2);
          table.appendChild(tbody);
        });
        for (var i = 0; i < parentss.length; i++) {
          if (parentss[i][0].marker === allele_states1[a][0].marker) {
            rightId = parentss[i][0].prescription;
            break;
          } else {
            rightId = hhh[j].value;
          }
        }
        // console.log(this.state.analys)

        axios
          .get(
            "/api/v1/haplotype_two_parents/" +
              clientId +
              "&" +
              dataVal1 +
              "&" +
              dataVal2 +
              "&" +
              rightId + "/"
          )
          // eslint-disable-next-line no-loop-func
          .then((response) => {
            console.log({ marker: "", compare: "" }, ...response.data);
            checkss = [{ marker: "", compare: "" }, ...response.data];
            checkss.forEach(function (check) {
              let checkRow = document.createElement("td");

              if (check.compare === "none") {
                checkRow.innerHTML = "";
              } else if (check.compare === "wrong") {
                checkRow.innerHTML = '<i class="bi bi-x-circle icon-red"></i>';
              } else if (check.compare === "right") {
                checkRow.innerHTML =
                  '<i class="bi bi-check-lg icon-green"></i>';
              }
              // checkRow.innerHTML = check.compare;
              console.log(check.compare);
              checks.appendChild(checkRow);
              tbody.appendChild(checks);
              table.appendChild(tbody);
            });

            console.log(checkss);

            const getNones = checkss.filter(
              (character) => character.compare === "none"
            );
            nones.push(...getNones);

            console.log(nones);
          })

          .catch((error) => {});

        document.getElementById("showData").appendChild(table);
        document.getElementById("forecastBtn").style.display = "flex";
        document.getElementById("datas").style.display = "none";
      }
    } catch {
      swal({
        title: "Error",
        text: "Make sure both parent fields have values",
        icon: "error",
        button: "Ok",
      }).then((okay) => {
        if (okay) {
          this.props.history.push("/Orion");
        } else {
          this.props.history.push("/Orion");
        }
      });
    }
    // console.log(dataVal2);
    // console.log(dataVal1);
  }

  getForecast() {
    // this.setState({ sendChartProps: false });
    var el = document.getElementById("datas");
    el.style.display = "grid";
    document.getElementById("crosses").style.display = "flex";
  }

  CrossTable(e) {
    try {
      if (parentss.length > 1) {
        var hhh = JSON.parse(localStorage.getItem("priscribe") || "[]");
        console.log(hhh);
      }
      var prescriptions = [];
      var tableHeader = [];
      prescriptions.length = 0;
      var seedling = document.getElementById("numSeed").value;
      var crossId = document.getElementById("crossID").value;
      console.log(seedling, crossId);
      var sampleCost = (nones.length * 0.3 * seedling).toFixed(2);
      console.log(sampleCost);
      nones.forEach((prescription) => {
        prescriptions.push(prescription.marker);
      });
      var crossTableForecast = JSON.parse(
        localStorage.getItem("crossForecast")
      );
      var charts = JSON.parse(localStorage.getItem("charts"));
      console.log(prescriptions, crossTableForecast);
      var header = [
        "Cross ID",
        "Parent 1",
        "Parent 2",
        "Number of Seedlings",
        "Cost $",
        "Prescription",
        "Forecast",
      ];

      //build for forecast
      var forecastPercent = [];
      var rowList = [
        crossId,
        dataVal1,
        dataVal2,
        seedling,
        sampleCost,
        prescriptions.join(" "),
      ];

      for (
        var i = 0, u = 0;
        i < charts.length, u < crossTableForecast.length;
        i++, u++
      ) {
        let obj = crossTableForecast[u].find((o) => o.forecast);
        console.log(Object.values(obj).join());
        console.log(charts);

        var arrWithForecast = charts[i].map((object) => {
          return {
            x: object.x,
            value: object.value / 10 + " %",
            forecast: Object.values(obj).join(),
          };
        });
        console.log(arrWithForecast);
        var newForecast = arrWithForecast.reduce(
          (data, item) =>
            Object.assign(data, Object.values(obj), { [item.x]: item.value }),
          {}
        );
        // rename to Forecast Key
        function renameKeys(obj, newKeys) {
          const keyValues = Object.keys(obj).map((key) => {
            const newKey = newKeys[key] || key;
            return { [newKey]: obj[key] };
          });
          return Object.assign({}, ...keyValues);
        }
        const newKeys = { 0: "Forecast" };
        const renamedObj = renameKeys(newForecast, newKeys);
        console.log(renamedObj);

        var stringifiedObj = Object.entries(renamedObj)
          .map((x) => x.join(":"))
          .join("     ");

        console.log(newForecast);

        rowList.push(stringifiedObj);
        console.log(rowList);
      }

      //build cross table
      var headerExists = document.getElementById("thead-Cross");
      var table = document.getElementById("crossTable");
      if (headerExists != null) {
        var row = table.insertRow();
        for (var i = 0; i < rowList.length; i++) {
          var cell = row.insertCell(i);
          cell.innerHTML = rowList[i];
        }
      } else {
        var rows = table.insertRow();
        for (var i = 0; i < rowList.length; i++) {
          var cellss = rows.insertCell(i);
          cellss.innerHTML = rowList[i];
        }
        var headers = table.createTHead();
        headers.setAttribute("class", "thead-dark");
        headers.setAttribute("id", "thead-Cross");
        var hrow = headers.insertRow();
        for (var w = 0; w < header.length; w++) {
          var cells = hrow.insertCell(w);
          cells.innerHTML = header[w];
        }

        document.getElementById("csv").style.display = "block";
      }
    } catch {
      swal({
        title: "Error",
        text: "Make sure you have the correct Data",
        icon: "error",
        button: "Ok",
      }).then((okay) => {
        if (okay) {
          this.props.history.push("/Orion");
        } else {
          this.props.history.push("/Orion");
        }
      });
    }
    // get columns
  }

  exportToCsv() {
    function downloadCSV(csv, filename) {
      var csvFile;
      var downloadLink;

      // CSV file
      csvFile = new Blob([csv], { type: "text/csv" });

      // Download link
      downloadLink = document.createElement("a");

      // File name
      downloadLink.download = filename;

      // Create a link to the file
      downloadLink.href = window.URL.createObjectURL(csvFile);

      // Hide download link
      downloadLink.style.display = "none";

      // Add the link to DOM
      document.body.appendChild(downloadLink);

      // Click download link
      downloadLink.click();
    }
    var csv = [];
    var rows = document.querySelectorAll("#crossTable tr");

    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("td, th");

      for (var j = 0; j < cols.length; j++) row.push(cols[j].innerText);

      csv.push(row.join(","));
    }

    downloadCSV(csv.join("\n"), "Cross Data");
  }

  getAlleteStatesP1(data) {
    try {
      allele_states1.length = 0;
      newData.length = 0;
      var clientId = localStorage.getItem("clientID");

      for (var i = 0; i < parentss.length; i++) {
        // console.log(parentss[i]);
        // console.log(dataVal1);
        let prescription = parentss[i].find((x) => x.prescription);
        newData.push(prescription.prescription);
      }
      for (var a = 0; a < newData.length; a++) {
        axios
          .get(
            "/api/v1/haplotypeparent_trait/" +
              clientId +
              "&" +
              data +
              "&" +
              newData[a] + "/"
          )
          .then((response) => {
            // swtched.push(JSON.(response.data))
            var filteredData = this.getUniqueListBy(response.data, "marker");
            allele_states1.push(filteredData);
            console.log(allele_states1);

            this.setState({ selected: false });
          })
          .catch((error) => {});
      }
    } catch {
      swal({
        title: "Error",
        text: "Make sure you have the correct Data",
        icon: "error",
        button: "Ok",
      }).then((okay) => {
       if (okay) {
         this.props.history.push("/Orion");
       } else {
         this.props.history.push("/Orion");
       }
      });
    }
  }

  getAlleteStatesP2(data) {
    try {
      allele_states2.length = 0;
      newData.length = 0;
      var clientId = localStorage.getItem("clientID");

      for (var i = 0; i < parentss.length; i++) {
        // console.log(parentss[i]);
        // console.log(dataVal1);
        let prescription = parentss[i].find((x) => x.prescription);
        newData.push(prescription.prescription);
      }
      for (var a = 0; a < newData.length; a++) {
        axios
          .get(
            "/api/v1/haplotypeparent_trait/" +
              clientId +
              "&" +
              data +
              "&" +
              newData[a] + "/"
          )
          .then((response) => {
            // swtched.push(JSON.(response.data))
            var filteredData = this.getUniqueListBy(response.data, "marker");
            allele_states2.push(filteredData);
            console.log(allele_states2);
            // console.log(swtched);
            this.setState({ selectedP2: false });
          })
          .catch((error) => {});
      }
    } catch {
      swal({
        title: "Error",
        text: "Make sure you have the correct Data",
        icon: "error",
        button: "Ok",
      }).then((okay) => {
        if (okay) {
          this.props.history.push("/Orion");
        } else {
          this.props.history.push("/Orion");
        }
      });
    }
  }

  handleChangeP1 = (selectedOptionsP1) => {
    allele_states1.length = 0;
    this.setState({ selectedOptionsP1 });
    this.setState({ selected: true });
  };
  handleChangeP2 = (selectedOptionsP2) => {
    this.setState({ selectedOptionsP2 });
    this.setState({ selectedP2: true });
  };

  onGoBack = () => {
    this.props.history.push("/Orion");
  };

  render() {
    const shelfArr = this.props.location.state.map((option) => {
      return {
        label: option.name,
        value: option.id,
      };
    });
    // console.log(shelfArr);
    const { selectedOptionsP1 } = this.state.selectedOptionsP1;
    const { selectedOptionsP2 } = this.state.selectedOptionsP2;

    if (this.state.selected) {
      dataVal1 = this.state.selectedOptionsP1.label;
      this.getAlleteStatesP1(this.state.selectedOptionsP1.label);
    } else if (this.state.selectedP2) {
      dataVal2 = this.state.selectedOptionsP2.label;
      this.getAlleteStatesP2(this.state.selectedOptionsP2.label);
    }
    return (
      <>
        {this.props.location.lineData.length > 0 ? (
          <FileUpload
            fileLines={this.props.location.lineData}
            clientID={localStorage.getItem("clientID")}
            traits={JSON.parse(localStorage.getItem("priscribe"))}
          ></FileUpload>
        ) : (
          <>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Paper
                elevation={12}
                style={{
                  width: "4%",
                  height: "56px",
                  marginTop: "1em",
                  marginRight: "4em",
                }}
              >
                <Button onClick={this.onGoBack}>Select traits</Button>
              </Paper>
              <Paper
                elevation={12}
                style={{
                  width: "60%",
                  height: "95px",
                  marginTop: "1em",
                  alignItems: "end",
                }}
              >
                <Grid
                  container
                  spacing={3}
                  align="center"
                  justify="center"
                  alignItems="center"
                  style={{ paddingTop: "2em" }}
                >
                  <Grid item xs={3}>
                    <Select
                      className="basic-single"
                      placeholder="Parent 1"
                      options={shelfArr}
                      isSearchable={true}
                      onChange={this.handleChangeP1}
                      value={selectedOptionsP1}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Select
                      className="basic-single"
                      placeholder="Parent 2"
                      options={shelfArr}
                      isSearchable={true}
                      onChange={this.handleChangeP2}
                      value={selectedOptionsP2}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      onClick={this.buildTable}
                    >
                      Cross
                    </button>
                  </Grid>
                </Grid>
              </Paper>{" "}
            </Box>

            <Paper
              elevation={2}
              style={{
                marginTop: "2em",
                marginLeft: "1em",
                marginRight: "1em",
              }}
            >
              <Grid
                container
                spacing={3}
                align="center"
                justify="center"
                alignItems="center"
                style={{ paddingTop: "2em" }}
              >
                <Grid id="showData" item xs={11}></Grid>
              </Grid>
            </Paper>

            <div
              style={{
                paddingTop: "2em",
                display: "none",
                marginRight: "1em",
                marginLeft: "1em",
              }}
              id="forecastBtn"
            >
              <button
                type="button"
                class="btn btn-outline-secondary"
                onClick={this.getForecast}
              >
                Get Forecast
              </button>
              <select
                style={{
                  paddingTop: ".6em",
                  display: "none",
                  marginRight: "1em",
                  marginLeft: "1em",
                }}
                ng-model="discussionsSelect"
                class="btn btn-outline-secondary dropdown-toggle"
                placeholder="View in different Chart"
                id="stats"
                onChange={this.buildTable}
              >
                <option value="column" selected>
                  View in different Chart
                </option>
                <option value="column">Column Chart</option>
                <option value="line">Line Chart</option>
                <option value="area">Area Chart</option>
              </select>
            </div>

            <Paper
              elevation={2}
              style={{
                marginTop: "2em",
                marginLeft: "1em",
                marginRight: "1em",
              }}
            >
              <Grid
                container
                spacing={6}
                align="center"
                justify="center"
                alignItems="center"
              >
                <Grid id="datas" item xs={12} style={{ display: "none" }}>
                  <div>
                    {this.state.sendChartProps ? (
                      <BuildChart
                        press={pres}
                        data1={dataVal1}
                        data2={dataVal2}
                        traits={JSON.parse(
                          localStorage.getItem("priscribe") || "[]"
                        )}
                        clientID={localStorage.getItem("clientID")}
                        sendChartProps={this.state.sendChartProps}
                        sendChartProps1={this.state.sendChartProps1}
                        checker={combinedData}
                      />
                    ) : (
                      <CircularProgress color="secondary" />
                    )}
                  </div>
                </Grid>
              </Grid>
            </Paper>

            <Grid
              id="mainContainer"
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 2 }}
            >
              <Grid item xs={12}>
                <div
                  style={{ display: "none" }}
                  class="input-group mb-3"
                  id="crosses"
                >
                  <div
                    class="input-group mb-3"
                    style={{
                      width: "13%",
                      paddingTop: "4em",
                      marginLeft: ".7em",
                    }}
                  >
                    <input
                      type="text"
                      id="crossID"
                      class="form-control"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Assign Cross ID"
                    ></input>
                  </div>
                  <div
                    class="input-group mb-3"
                    style={{
                      width: "22%",
                      paddingTop: "4em",
                      marginLeft: ".7em",
                    }}
                  >
                    <input
                      type="number"
                      id="numSeed"
                      class="form-control"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Num of Seedlings"
                    ></input>
                    <div
                      class="col-auto "
                      style={{ paddingLeft: "2em", height: ".9px" }}
                    >
                      <button
                        onClick={this.CrossTable}
                        type="submit"
                        class="btn btn-secondary mb-2"
                        id="addcsv"
                        value="submit"
                      >
                        Add to Cross List
                      </button>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>

            <div class="container-fluid">
              <table
                class="table table-hover table-bordered table-sm table-responsive card-1 p-4"
                id="crossTable"
              ></table>
            </div>

            <section id="csv" style={{ display: "none" }}>
              <button
                onClick={this.exportToCsv}
                type="submit"
                class="btn btn-secondary mb-2"
                id="addcsv"
                value="submit"
              >
                Export
              </button>
            </section>
          </>
        )}
      </>
    );
  }
}
