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
    .keys(['GPT-4', 'Gemini', 'PaLM-2', 'CLaude', 'LLaMA-3.1'])
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

    //area generator
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
    
    //paths
    var pathData1 = areaGenerator(stack[0])
    var pathData2 = areaGenerator(stack[1])
    var pathData3 = areaGenerator(stack[2])
    var pathData4 = areaGenerator(stack[3])
    var pathData5 = areaGenerator(stack[4])

    svg.selectAll('.path1').data([null]).join('path').attr('class', 'path1')
      .attr('d', pathData1)
      .attr('fill', "#e41a1c")
      .on('mouseover', function(event) {
        d3.select("#barchart1").style('visibility', 'visible');
      })
      .on('mousemove', function(event) {
        const [x, y] = d3.pointer(event);
        d3.select("#barchart1")
          .style('left', `${x-100}px`)
          .style('top', `${y + 175}px`)
      })
      .on('mouseout', function(event) {
        d3.select("#barchart1").style('visibility', 'hidden')
      });
  
    svg.selectAll('.path2').data([null]).join('path').attr('class', 'path2')
      .attr('d', pathData2)
      .attr('fill', "#377eb8")
      .on('mouseover', function(event) {
        d3.select("#barchart2").style('visibility', 'visible');
      })
      .on('mousemove', function(event) {
        const [x, y] = d3.pointer(event);
        d3.select("#barchart2")
          .style('left', `${x-100}px`)
          .style('top', `${y + 175}px`)
      })
      .on('mouseout', function(event) {
        d3.select("#barchart2").style('visibility', 'hidden')
      });
    
    svg.selectAll('.path3').data([null]).join('path').attr('class', 'path3')
      .attr('d', pathData3)
      .attr('fill', "#4daf4a")
      .on('mouseover', function(event) {
        d3.select("#barchart3").style('visibility', 'visible');
      })
      .on('mousemove', function(event) {
        const [x, y] = d3.pointer(event);
        d3.select("#barchart3")
          .style('left', `${x-100}px`)
          .style('top', `${y + 175}px`)
      })
      .on('mouseout', function(event) {
        d3.select("#barchart3").style('visibility', 'hidden')
      });

      svg.selectAll('.path4').data([null]).join('path').attr('class', 'path4')
      .attr('d', pathData4)
      .attr('fill', "#984ea3")
      .on('mouseover', function(event) {
        d3.select("#barchart4").style('visibility', 'visible');
      })
      .on('mousemove', function(event) {
        const [x, y] = d3.pointer(event);
        d3.select("#barchart4")
          .style('left', `${x-100}px`)
          .style('top', `${y + 175}px`)
      })
      .on('mouseout', function(event) {
        d3.select("#barchart4").style('visibility', 'hidden')
      });

      svg.selectAll('.path5').data([null]).join('path').attr('class', 'path5')
      .attr('d', pathData5)
      .attr('fill', "#ff7f00")
      .on('mouseover', function(event) {
        d3.select("#barchart5").style('visibility', 'visible');
      })
      .on('mousemove', function(event) {
        const [x, y] = d3.pointer(event);
        d3.select("#barchart5")
          .style('left', `${x-100}px`)
          .style('top', `${y + 175}px`)
      })
      .on('mouseout', function(event) {
        d3.select("#barchart5").style('visibility', 'hidden')
      });

      //legend
      const legend = d3.select("#mylegend")
      .attr("width", 100)
      .attr("height", 100)
      .attr("transform", `translate(0,-100)`);

      legend.append("rect")
        .attr("x",0).attr("y",0)
        .attr("width", 15).attr("height", 15).style("fill", "#ff7f00")
      legend.append("text").attr("x", 20).attr("y", 10)
        .text('LLaMA-3.1').style("font-size", "12px")
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

      const allBarcharts = d3.selectAll(".barchart")
      .attr("width", 300).attr("height", 150)
      .style('visibility', 'hidden')
      
      allBarcharts.append('rect')
        .attr("width", 300).attr("height", 150)
        .attr("rx", 10).attr("ry", 10)
        .style("fill", '#f2f0ef')

      var x_data = data.map(item=>item.Date)
      const x_scale_bar = d3.scaleBand().domain(x_data).range([0,225]).padding(0.2);
      const xAxis = d3.axisBottom(x_scale_bar)
        .tickFormat(d3.timeFormat("%b"))

      allBarcharts.selectAll(".barx")
      .data([null])
      .join("g")
      .attr("class", "barx")
      .attr("transform", `translate(40,125)`)
      .call(xAxis);

      const barchart1 = d3.select("#barchart1");

      const gpt_scale = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d['GPT-4'])])
        .range([100, 0]);

      barchart1.selectAll(".bar1y")
      .data([null])
      .join("g")
      .attr("class", "bar1y")
      .attr("transform", `translate(40,25)`)
      .call(d3.axisLeft(gpt_scale).ticks(7).tickPadding(3));

      barchart1.selectAll('rect.bar1')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function(d){
        return x_scale_bar(d.Date)
      })
      .attr('y', d => gpt_scale(d['GPT-4']))
      .attr('width', x_scale_bar.bandwidth())
      .attr('height', d => 100 - gpt_scale(d['GPT-4']))
      .attr("transform", `translate(40,25)`)
      .attr('fill', "#e41a1c");

      const barchart2 = d3.select("#barchart2");

      const gemini_scale = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d['Gemini'])])
        .range([100, 0]);

      barchart2.selectAll(".bar2y")
      .data([null])
      .join("g")
      .attr("class", "bar2y")
      .attr("transform", `translate(40,25)`)
      .call(d3.axisLeft(gemini_scale).ticks(7).tickPadding(3));

      barchart2.selectAll('rect.bar2')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function(d){
        return x_scale_bar(d.Date)
      })
      .attr('y', d => gemini_scale(d['Gemini']))
      .attr('width', x_scale_bar.bandwidth())
      .attr('height', d => 100 - gemini_scale(d['Gemini']))
      .attr("transform", `translate(40,25)`)
      .attr('fill',  "#377eb8");
      
      const barchart3 = d3.select("#barchart3");

      const PaLM_scale = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d['PaLM-2'])])
        .range([100, 0]);

      barchart3.selectAll(".bar3y")
      .data([null])
      .join("g")
      .attr("class", "bar3y")
      .attr("transform", `translate(40,25)`)
      .call(d3.axisLeft(PaLM_scale).ticks(7).tickPadding(3));

      barchart3.selectAll('rect.bar3')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function(d){
        return x_scale_bar(d.Date)
      })
      .attr('y', d => PaLM_scale(d['PaLM-2']))
      .attr('width', x_scale_bar.bandwidth())
      .attr('height', d => 100 - PaLM_scale(d['PaLM-2']))
      .attr("transform", `translate(40,25)`)
      .attr('fill', "#4daf4a");

      const barchart4 = d3.select("#barchart4");

      const CLaude_scale = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d['CLaude'])])
        .range([100, 0]);

      barchart4.selectAll(".bar4y")
      .data([null])
      .join("g")
      .attr("class", "bar4y")
      .attr("transform", `translate(40,25)`)
      .call(d3.axisLeft(CLaude_scale).ticks(7).tickPadding(3));

      barchart4.selectAll('rect.bar4')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function(d){
        return x_scale_bar(d.Date)
      })
      .attr('y', d => CLaude_scale(d['CLaude']))
      .attr('width', x_scale_bar.bandwidth())
      .attr('height', d => 100 - CLaude_scale(d['CLaude']))
      .attr("transform", `translate(40,25)`)
      .attr('fill', "#984ea3");

      const barchart5 = d3.select("#barchart5");

      const LLaMA_scale = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d['LLaMA-3.1'])])
        .range([100, 0]);

      barchart5.selectAll(".bar5y")
      .data([null])
      .join("g")
      .attr("class", "bar5y")
      .attr("transform", `translate(40,25)`)
      .call(d3.axisLeft(LLaMA_scale).ticks(7).tickPadding(3));

      barchart5.selectAll('rect.bar5')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function(d){
        return x_scale_bar(d.Date)
      })
      .attr('y', d => LLaMA_scale(d['LLaMA-3.1']))
      .attr('width', x_scale_bar.bandwidth())
      .attr('height', d => 100 - LLaMA_scale(d['LLaMA-3.1']))
      .attr("transform", `translate(40,25)`)
      .attr('fill', "#ff7f00");

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
          <div className="barcharts">
            <svg className="barchart" id="barchart1"></svg>
            <svg className="barchart" id="barchart2"></svg>
            <svg className="barchart" id="barchart3"></svg>
            <svg className="barchart" id="barchart4"></svg>
            <svg className="barchart" id="barchart5"></svg>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Child1;
