/* eslint-disable no-loop-func */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Table from "@material-ui/core/Table";
import { push } from "connected-react-router";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { createStore } from "redux";
import Draggable from "react-draggable";
import "./cross.css";
import { Chart } from "react-google-charts";
import { array, element } from "prop-types";
import AnyChart from 'anychart-react';
import ReactDOMServer from "react-dom/server";
import { Container } from "react-bootstrap";
import $ from "jquery";




var markers = [];
var parents = [];
let parentss = [];
var allele_states1 = [];
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
var charts = []
var nones = []
var crossTableForecast = []

export default class Cross extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked1: null,
      checked2: null,
      markers: null,
      parent1: null,
      parent2: null,
      data1: [],
      data2: [],
    };
  }

  componentDidMount() {
    markers.length = 0;
    parentss.length = 0;
    parents.length = 0;
    var clientId = localStorage.getItem("clientId");
    var traitId = localStorage.getItem("traits");
    var newtttt = JSON.parse(traitId);
    for (var i = 0; i < newtttt.length; i++) {
      axios
        .get("/api/v1/assaypositions/" + clientId + "&" + newtttt[i].value)
        .then((response) => {
          parentss.push(response.data);
          console.log(parentss);
        })
        .catch((error) => {});
    }
  }

  getMarkers() {
    tHead.length = 0;
    parents.length = 0;
    var clientId = localStorage.getItem("clientId");
    let result = parentss[0].map((a) => a.id);
    console.log(result);
    if (result.every((val, i, arr) => val === arr[0])) {
      console.log("true");
      axios
        .get("/api/v1/haplotypeparent/" + clientId + "&" + result[0])
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {});
    }
    for (var i = 0; i < parentss.length; i++) {
      let newParent = parentss[i];
      for (var j = 0; j < newParent.length; j++) {
        axios
          .get("/api/v1/haplotypeparent/" + clientId + "&" + newParent[j].id)
          .then((response) => {
            parents.push(...response.data);
          })
          .catch((error) => {});
      }
    }
  }

  setValueP1 = (newValue) => {
    checked.length = 0;
    newData.length = 0;
    allele_states1.length = 0;
    var clientId = localStorage.getItem("clientId");
    dataVal1 = newValue.name;
    for (var i = 0; i < parentss.length; i++) {
      console.log(parentss[i]);
      console.log(dataVal1);
      let prescription = parentss[i].find((x) => x.prescription);
      newData.push(prescription.prescription);
    }
    for (var a = 0; a < newData.length; a++) {
      axios
        .get(
          "/api/v1/haplotypeparent_trait/" +
            clientId +
            "&" +
            newValue.name +
            "&" +
            newData[a]
        )
        .then((response) => {
          allele_states1.push(response.data);
          console.log(allele_states1);
        })
        .catch((error) => {});
    }
  };

  setValueP2 = (newValue) => {
    this.setState({ data1: allele_states1 });
    newData.length = 0;
    allele_states2.length = 0;
    var clientId = localStorage.getItem("clientId");
    dataVal2 = newValue.name;
    for (var i = 0; i < parentss.length; i++) {
      console.log(parentss[i]);
      let prescription = parentss[i].find((x) => x.prescription);
      newData.push(prescription.prescription);
    }
    for (var a = 0; a < newData.length; a++) {
      axios
        .get(
          "/api/v1/haplotypeparent_trait/" +
            clientId +
            "&" +
            newValue.name +
            "&" +
            newData[a]
        )
        .then((response) => {
          allele_states2.push(response.data);
          console.log(allele_states2);
        })
        .catch((error) => {});
    }
  };

  buildTable() {
    console.log(dataVal2);
    console.log(dataVal1);
    newArray.length = 0;
    nones.length = 0
    crossTableForecast.length = 0
    var clientId = localStorage.getItem("clientId");
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
    for ( var a = 0, b = 0, j = 0; a < allele_states1.length, b < allele_states2.length, j < hhh.length; a++, b++, j++) {
      console.log(hhh[j].value);

      console.log(checkss);
      let table = document.createElement("table");
      table.setAttribute(
        "class",
        "table table-hover table-bordered table-sm table-responsive card-1 p-4"
      );
      table.setAttribute("id", "tab");

      let thead = document.createElement("thead");
      thead.setAttribute('class', 'thead-dark')
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
          rank: "",
          allele: dataVal1,
          ideal: "Ideal Haplotype",
        },
        ...allele_states1[a],
        {
          marker: "Category",
          rank: "",
          allele: allele_states1[a][1]["category"],
          ideal: "",
          category: "",
        },
      ];
      var newTableData1 = [
        { marker: "Parent Name", rank: "", allele: dataVal2 },
        ...allele_states2[b],
        {
          marker: "Category",
          rank: "",
          allele: allele_states2[b][1]["category"],
          ideal: "",
          category: "",
        },
      ];

      //  console.log(checked[m][1])
      console.log(newTableData);

      console.log(newTableData);
      console.log(allele_states1[a][1]["category"]);
      console.log(newTableData1);

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

      axios
        .get(
          "/api/v1/haplotype_two_parents/" +
            clientId +
            "&" +
            dataVal1 +
            "&" +
            dataVal2 +
            "&" +
            hhh[j].value
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
              checkRow.innerHTML = '<i class="bi bi-check-lg icon-green"></i>';
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
          nones.push(...getNones)

          console.log(nones);

        })

        .catch((error) => {});

      document.getElementById("showData").appendChild(table);
      document.getElementById("forecastBtn").style.display = "block";
      
    }
  }




getForecast() {
    var clientId = localStorage.getItem("clientId");
    var hhh = JSON.parse(localStorage.getItem("priscribe") || "[]");
    charts.length = 0
    
      // check for existing table 
     for (var forecast = 0; forecast < hhh.length; forecast++) {
       var parentDiv = document.getElementById("datas");
       var childDiv = document.getElementById(hhh[forecast].label);
       if (parentDiv.contains(childDiv)) {
         document.getElementById("datas").innerHTML = "";
       } else {
         document.getElementById("datas");
       }
       var pieDa = hhh[forecast].label;
    let pies = document.createElement("div");
    pies.setAttribute("id", hhh[forecast].label);
    pies.setAttribute("class", "col");
       // getting data for charts
       axios
         .get(
           "/api/v1/haplotype_forecast/" +
             clientId +
             "&" +
             dataVal1 +
             "&" +
             dataVal2 +
             "&" +
             hhh[forecast].value
         )
         .then((response) => {
           crossTableForecast.push(response.data);
           console.log(crossTableForecast);
           let obj = response.data.find((o) => o.forecast);
           console.log(Object.values(obj).join());

           const option = [];

           var arrWithForecast = response.data.map((object) => {
             return {
               x: Object.keys(object).join(),
               value: Object.values(object).join(),
             };
           });

           console.log(pieDa);
           var pieData = arrWithForecast.pop();

           //build charts

           let Hellos = () => {
             return (
               <>
                 <div>
                   <p id="results" class="btn btn-outline-secondary">
                     {"Forecast for" +
                       " " +
                       Object.values(option).join() +
                       " " +
                       "is " +
                       " " +
                       Object.values(obj).join()}
                   </p>
                 </div>
                 <div className="piChart">
                   <AnyChart
                     width={300}
                     height={300}
                     type="pie3d"
                     data={arrWithForecast}
                   />

                   <AnyChart
                     width={450}
                     height={300}
                     type="column"
                     data={arrWithForecast}
                   />
                 </div>
               </>
             );
           };

           ReactDOMServer.renderToStaticMarkup(<Hellos />);
           ReactDOM.render(<Hellos />, pies);
           console.log(arrWithForecast);
           charts.push(arrWithForecast);

           console.log(charts);
         })
         
         .catch((error) => {});
      document.getElementById("datas").appendChild(pies);
           console.log(hhh[forecast].label);

     }
      document.getElementById("crosses").style.display = "flex";

    }

    CrossTable() {
      // get columns 
      if(parentss.length > 1){
        var hhh = JSON.parse(localStorage.getItem("priscribe") || "[]");
        console.log(hhh)

      }
    var  prescriptions = []
    var tableHeader = []
    prescriptions.length = 0
    var seedling =  document.getElementById("numSeed").value;
    var crossId = document.getElementById("crossID").value;
    console.log(seedling, crossId)
    var sampleCost = (nones.length * .3 * seedling).toFixed(2)
    console.log(sampleCost);
    nones.forEach((prescription) => {
      prescriptions.push(prescription.marker)
    })
    console.log(prescriptions)
    var header = [
      "Cross ID",
      "Parent 1",
      "Parent 2",
      "Number of Seedlings",
      "Cost",
      "Prescription",
    ];
    hhh.forEach((data) => {
      header.push(data.label);
      
    })

    //build for forecast
    var forecastPercent = []
    var rowList = [
      crossId,
      dataVal1,
      dataVal2,
      seedling,
      sampleCost,
      prescriptions.join(" "),
    ];

    for(var i = 0, u =0; i < charts.length, u < crossTableForecast.length; i++, u++){
      let obj = crossTableForecast[u].find((o) => o.forecast);
     // console.log(Object.values(obj).join());
      var arrWithForecast = charts[i].map((object) => {
        return {
          x: object.x,
          value: object.value / 10 + " %",
          forecast: Object.values(obj).join(),
        };
      });
      var newForecast = arrWithForecast.reduce(
        (data, item) =>
          Object.assign(
            data, Object.values(obj),
            { [item.x]: item.value }
            
          ),
        {}
      );

      var stringifiedObj = Object.entries(newForecast)
        .map((x) => x.join(":"))
        .join("     ");

      console.log(newForecast);
      rowList.push(stringifiedObj)
      console.log(rowList);

     
    }

    //build cross table
    var headerExists = document.getElementById('thead-Cross')
    var table = document.getElementById("crossTable");
    if(headerExists != null){
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

       downloadCSV(csv.join("\n"), 'Cross Data');

    }

    



  render() {
    return (
      <>
        <div>
          <form className="parentInput">
            <div class="d-flex justify-content-center">
              <div class="col-10" style={{ paddingRight: "1em" }}>
                <Autocomplete
                  onChange={(event, newValue) => {
                    this.setValueP1(newValue);
                    // this.getChecks()
                  }}
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={parents}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) =>
                    option.name === value.name
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // label="limitTags"
                      placeholder="Parent1"
                      class="form-control"
                      onClick={this.getMarkers}
                    />
                  )}
                />
              </div>
              <div class="col-10" style={{ paddingRight: "1em" }}>
                <Autocomplete
                  onChange={(event, newValue) => {
                    this.setValueP2(newValue);
                  }}
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={parents}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) =>
                    option.name === value.name
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // label="limitTags"
                      placeholder="Parent2"
                      class="form-control"
                      onClick={this.getMarkers}
                    />
                  )}
                />
              </div>
              <button
                type="button"
                class="btn btn-secondary"
                onClick={this.buildTable}
              >
                Submit
              </button>
            </div>
          </form>
          <div>{this.buildTable}</div>
        </div>
        <div class="container-fluid" id="showData"></div>

        <section
          class="float-left"
          id="forecastBtn"
          style={{
            paddingTop: "1em",
            justifyItems: "flex-end",
            display: "none",
          }}
        >
          <button
            type="button"
            class="btn btn-outline-secondary"
            onClick={this.getForecast}
          >
            Get Forecast
          </button>
        </section>
        <div class="container-fluid" id="showChart"></div>
        <div class="row" id="datas"></div>

        <div style={{ display: "none" }} class="input-group mb-3" id="crosses">
          <div
            class="input-group mb-3"
            style={{ width: "20%", paddingTop: "4em", marginLeft: ".7em" }}
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
            style={{ width: "20%", paddingTop: "4em", marginLeft: ".7em" }}
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
                Submit
              </button>
            </div>
          </div>
        </div>

        <div class="container-fluid">
          <table
            class="table table-hover table-bordered table-sm table-responsive card-1 p-4"
            id="crossTable"
          ></table>
        </div>

        <section id='csv' style={{display: 'none'}}>
          <button
            onClick={this.exportToCsv}
            type="submit"
            class="btn btn-secondary mb-2"
            id="addcsv"
            value="submit"
          >Export</button>
        </section>
      </>
    );
  }
}
