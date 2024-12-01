import React, { Component } from "react";
import * as d3 from "d3";
import "./Child1.css";

class Child1 extends Component {
  state = { 

  };

  componentDidMount() {
    //console.log("Data: ", this.props.csv_data) // Use this data as default. When the user will upload data this props will provide you the updated data
    //this.renderChart();
  }

  componentDidUpdate() {
    //console.log("Data: ", this.props.csv_data)
    this.renderChart();
  }

  renderChart(){
    var data = this.props.csv_data

    const stackGenerator = d3.stack()
    .keys(['GPT-4', 'Gemini', 'PaLM-2', 'CLaude', 'LLaMa-3.1'])
    .order(d3.stackOrderNone) 
    .offset(d3.stackOffsetWiggle);

    var stack = stackGenerator(data);


    // Set the dimensions of the chart
    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
    width = 300,
    height = 300,
    innerWidth = 300 - margin.left - margin.right,
    innerHeight = 300 - margin.top - margin.bottom;

    // Create the SVG container
    const svg = d3.select("#mysvg")
      .attr("width", width)
      .attr("height", height)
      .select("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    //Set the scales for the axes
    const x_Scale = d3.scaleTime()
      .domain(d3.extent(data, (d) => d.Date))
      .range([0, innerWidth]);

    const y_Scale = d3.scaleLinear()
      .domain([-100,500])
      .range([innerHeight, 0]);


    // Add the X axis using join
    svg
      .selectAll(".x.axis")
      .data([null])
      .join("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x_Scale).ticks(d3.timeMonth.every(1)).tickFormat(d3.timeFormat("%b")));

    // Add the Y axis using join
    // svg
    //   .selectAll(".y.axis")
    //   .data([null])
    //   .join("g")
    //   .attr("class", "y axis")
    //   .call(d3.axisLeft(y_Scale));

    var areaGenerator = d3.area()
      .x(function(d){
        //console.log("Date ", x_Scale(d.data.Date))
        return x_Scale(d.data.Date)
      })
      .y0(d => y_Scale(d[0]))
      .y1(function(d){
        //console.log("y1 ", y_Scale(d[1]))
        return y_Scale(d[1])
      })
      .curve(d3.curveBasis);

    var pathData1 = areaGenerator(stack[0])
    var pathData2 = areaGenerator(stack[1])
    var pathData3 = areaGenerator(stack[2])
    var pathData4 = areaGenerator(stack[3])
    var pathData5 = areaGenerator(stack[4])

    svg.selectAll('.path1').data([null]).join('path').attr('class', 'path1')
      .attr('d', pathData1)
      .attr('fill', "#e41a1c");
  
    svg.selectAll('.path2').data([null]).join('path').attr('class', 'path2')
      .attr('d', pathData2)
      .attr('fill', "#377eb8");
    
    svg.selectAll('.path3').data([null]).join('path').attr('class', 'path3')
      .attr('d', pathData3)
      .attr('fill', "#4daf4a");

      svg.selectAll('.path4').data([null]).join('path').attr('class', 'path4')
      .attr('d', pathData4)
      .attr('fill', "#984ea3");

      svg.selectAll('.path5').data([null]).join('path').attr('class', 'path5')
      .attr('d', pathData5)
      .attr('fill', "#ff7f00");

      const legend = d3.select("#mylegend")
      .attr("width", 100)
      .attr("height", 100)
      .attr("transform", `translate(0,-100)`);

      legend.append("rect")
        .attr("x",0).attr("y",0)
        .attr("width", 15).attr("height", 15).style("fill", "#ff7f00")
      legend.append("text").attr("x", 20).attr("y", 10)
        .text('LLaMa-3.1').style("font-size", "12px")
        .attr("alignment-baseline","middle")
      legend.append("rect")
        .attr("x",0).attr("y",20)
        .attr("width", 15).attr("height", 15).style("fill", "#984ea3")
      legend.append("text").attr("x", 20).attr("y", 30)
        .text('CLaude').style("font-size", "12px")
        .attr("alignment-baseline","middle")
      legend.append("rect")
        .attr("x",0).attr("y",40)
        .attr("width", 15).attr("height", 15).style("fill", "#4daf4a")
      legend.append("text").attr("x", 20).attr("y", 50)
        .text('PaLM-2').style("font-size", "12px")
        .attr("alignment-baseline","middle")
      legend.append("rect")
        .attr("x",0).attr("y",60)
        .attr("width", 15).attr("height", 15).style("fill", "#377eb8")
      legend.append("text").attr("x", 20).attr("y", 70)
        .text('Gemini').style("font-size", "12px")
        .attr("alignment-baseline","middle")
      legend.append("rect")
        .attr("x",0).attr("y",80)
        .attr("width", 15).attr("height", 15).style("fill", "#e41a1c")
      legend.append("text").attr("x", 20).attr("y", 90)
        .text('GPT-4').style("font-size", "12px")
        .attr("alignment-baseline","middle")

  }

  render() {
    return (
      <div className="child1">
        <div className="graph">
          <svg id="mysvg">
            <g></g>
          </svg>
          <svg id="mylegend">
          </svg>
        </div>
      </div>
    );
  }
}

export default Child1;
