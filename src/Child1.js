import React, { Component } from "react";
import * as d3 from "d3";
import "./Child1.css";

class Child1 extends Component {
  state = { 
    company: "Apple", // Default Company
    selectedMonth: 'Nov' //Default Month
  };

  componentDidMount() {
    //console.log(this.props.csv_data) // Use this data as default. When the user will upload data this props will provide you the updated data
    this.renderChart();
  }

  componentDidUpdate() {
    //console.log(this.props.csv_data)
    this.renderChart();
  }

  renderChart(){
    var originalData = this.props.csv_data
    var data = []

    for(var i = 0; i < originalData.length; i++){
      if(originalData[i].Company === this.state.company){
        var date = originalData[i].Date.toString()
        var dateArray = date.split(/ /);
        if(dateArray[1] === this.state.selectedMonth){
          data.push(originalData[i])
        }
      }
    }
    console.log(data)

    // Set the dimensions of the chart
    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
    width = 500,
    height = 300,
    innerWidth = 500 - margin.left - margin.right,
    innerHeight = 300 - margin.top - margin.bottom;

    // Create the SVG container
    const svg = d3.select("#mysvg")
      .attr("width", width)
      .attr("height", height)
      .select("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set the scales for the axes
    const x_Scale = d3.scaleTime()
      .domain(d3.extent(data, (d) => d.Date))
      .range([0, innerWidth]);

    const y_Scale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.Low), d3.max(data, (d) => d.High)])
      .range([innerHeight, 0]);

    // Create the line Generator
    var openlineGenerator = d3.line()
      .x((d) => x_Scale(d.Date))
      .y((d) => y_Scale(d.Open))
      .curve(d3.curveCardinal);

    var closelineGenerator = d3.line()
      .x((d) => x_Scale(d.Date))
      .y((d) => y_Scale(d.Close))
      .curve(d3.curveCardinal);

    //get path data
    var openpathData = openlineGenerator(data);
    var closepathData = closelineGenerator(data)

    svg
      .selectAll(".openPath")
      .data([openpathData])
      .join("path")
      .attr("class", "openPath")
      .attr("d", (myd) => myd)
      .attr("fill", "none")
      .attr("stroke", "#b2df8a")
      .attr("stroke-width", 3)
    
    svg
      .selectAll(".closePath")
      .data([closepathData])
      .join("path")
      .attr("class", "closePath")
      .attr("d", (myd) => myd)
      .attr("fill", "none")
      .attr("stroke", "#e41a1c")
      .attr("stroke-width", 3);


    // Add the X axis using join
    svg
      .selectAll(".x.axis")
      .data([null])
      .join("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x_Scale));

    // Add the Y axis using join
    svg
      .selectAll(".y.axis")
      .data([null])
      .join("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y_Scale));

    svg.selectAll(".openCircle")
    .data(data)
    .join("circle")
    .attr("class", "openCircle")
      .attr("cx", function(d){
        return x_Scale(d.Date)
      })
      .attr("cy", function(d){
        return y_Scale(d.Open)
      })
      .attr("r", 4)
      .style("fill", "#b2df8a")

      //I tried to include the tooltip but i couldn't figure it out in time
      
      // .on("mouseover", e =>{

      //   // d3.selectAll(".tooltip")
      //   // .data(data)
      //   // .join("div").attr("class","tooltip")
      //   // .append("text").text()

      //   console.log("cx", e)
      // })
      // .on("mouseout", e =>{
      //   //d3.selectAll(".tooltip").remove()
      // })

    svg.selectAll(".closeCircle")
      .data(data)
      .join("circle")
      .attr("class", "closeCircle")
        .attr("cx", function(d){
          return x_Scale(d.Date)
        })
        .attr("cy", function(d){
          return y_Scale(d.Close)
        })
        .attr("r", 4)
        .style("fill", "#e41a1c");



  }

  render() {
    const options = ['Apple', 'Microsoft', 'Amazon', 'Google', 'Meta']; // Use this data to create radio button
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // Use this data to create dropdown

    return (
      <div className="child1">

        <div className="radioButtons">
          <text>Company: </text>
          <input type="radio" name="company" value={options[0]} onChange={e=>this.setState({company : e.target.value})}/>{options[0]}
          <input type="radio" name="company" value={options[1]} onChange={e=>this.setState({company : e.target.value})}/>{options[1]}
          <input type="radio" name="company" value={options[2]} onChange={e=>this.setState({company : e.target.value})}/>{options[2]}
          <input type="radio" name="company" value={options[3]} onChange={e=>this.setState({company : e.target.value})}/>{options[3]}
          <input type="radio" name="company" value={options[4]} onChange={e=>this.setState({company : e.target.value})}/>{options[4]}
        </div>

        <div className="dropdownMenu">
          <text>Month: </text>
          <input type="radio" name="month" value={'Jan'} onChange={e=>this.setState({selectedMonth : e.target.value})}/>{months[0]}
          <input type="radio" name="month" value={'Feb'} onChange={e=>this.setState({selectedMonth : e.target.value})}/>{months[1]}
          <input type="radio" name="month" value={'Mar'} onChange={e=>this.setState({selectedMonth : e.target.value})}/>{months[2]}
          <input type="radio" name="month" value={'Apr'} onChange={e=>this.setState({selectedMonth : e.target.value})}/>{months[3]}
          <input type="radio" name="month" value={'May'} onChange={e=>this.setState({selectedMonth : e.target.value})}/>{months[4]}
          <input type="radio" name="month" value={'Jun'} onChange={e=>this.setState({selectedMonth : e.target.value})}/>{months[5]}
          <input type="radio" name="month" value={'Jul'} onChange={e=>this.setState({selectedMonth : e.target.value})}/>{months[6]}
          <input type="radio" name="month" value={'Aug'} onChange={e=>this.setState({selectedMonth : e.target.value})}/>{months[7]}
          <input type="radio" name="month" value={'Sep'} onChange={e=>this.setState({selectedMonth : e.target.value})}/>{months[8]}
          <input type="radio" name="month" value={'Oct'} onChange={e=>this.setState({selectedMonth : e.target.value})}/>{months[9]}
          <input type="radio" name="month" value={'Nov'} onChange={e=>this.setState({selectedMonth : e.target.value})}/>{months[10]}
          <input type="radio" name="month" value={'Dec'} onChange={e=>this.setState({selectedMonth : e.target.value})}/>{months[11]}
        </div>

        <div className="lineGraph">
          <svg id="mysvg" width="700" height="400">
            <g></g>
          </svg>
        </div>

        {/* <div className="tooltip">
          <text>test</text>
        </div> */}

        

      </div>
    );
  }
}

export default Child1;
