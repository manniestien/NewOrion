import React, { Component } from "react";
import axios from "axios";
import Chart from "react-google-charts";
import { Grid, ListItem } from "@material-ui/core";

var chartData = [];
var traitName;
var forecast;

const options = {
  // title: 'Forecasr for' + ' ' + traitName + ' ' + 'is ' + ' ' + forecast,
  is3D: true,
};

var task = [];

export default class BuildChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChart: this.props.sendChartProps,
      parent1: "",
      parent2: "",
    };
    this.buildChart = this.buildChart.bind(this);
  }
  componentDidMount() {
    task.length = 0;
    this.fetchPokemons();
  }

  async fetchPokemons() {
    const promises = [];

    // console.time("Nice way");

    for (const element in this.props.traits) {
      const result = axios.get(
        "/api/v1/haplotype_forecast/" +
          this.props.clientID +
          "&" +
          this.props.data1 +
          "&" +
          this.props.data2 +
          "&" +
          this.props.traits[element].value
      );
      promises.push(result, this.props.traits[element].label);
      console.log(await (await result).data, this.props.traits[element].label);
      this.buildChart(
        await (
          await result
        ).data,
        this.props.traits[element].label
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.checker !== this.props.checker) {
      task.length = 0;
      this.fetchPokemons();
    }
  }
  buildChart(data, traitname) {
    console.log(data);
    console.log(traitname);

    var arrWithForecast = data.map((object) => {
      forecast = object.forecast;
      return [Object.keys(object).join(), parseInt(Object.values(object))];
    });
    arrWithForecast.pop();
    arrWithForecast.unshift(["Task", "News"]);
    console.log(arrWithForecast);
    traitName = traitname;
    task.push({
      graphData: arrWithForecast,
      trait: traitname,
      forecast: forecast,
    });
    chartData = arrWithForecast;
    this.setState({ showChart: false });
    console.log(task);
  }

  render() {
    let grid;
    if (!this.state.showChart) {
      grid = task.map((_, index) => (
        <>
          <Grid key={index} item xs={6}>
            <p>
              {"Forecast for" +
                " " +
                task[index].trait +
                " " +
                "is " +
                " " +
                task[index].forecast}
            </p>

            <ListItem>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <ListItem>
                    <Chart
                      chartType="PieChart"
                      data={task[index].graphData}
                      options={options}
                      width={"100%"}
                      height={"400px"}
                    />
                  </ListItem>
                </Grid>

                <Grid item xs={6}>
                  <ListItem>
                    <Chart
                      chartType="ColumnChart"
                      data={task[index].graphData}
                      options={options}
                      title={task[index].trait}
                      width={"100%"}
                      height={"400px"}
                    />
                  </ListItem>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
        </>
      ));

      console.log(chartData.length);
    }

    return (
      <>
        <Grid
          id="mainContainer"
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {grid}
        </Grid>
      </>
    );
  }
}
