import React, { Component } from 'react'

export default class CirclePack extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let svg = d3.select(this.refs.conduit)
    .append("svg")
    .attr("height", "100%")
    .attr("width", "100%")

    let data = {
      name: 'master',
      size: 10,
      children: [{ 
        name: 'child1', size: 2}, {
        name: 'child2', size: 1}, { 
        name: 'child3', size: 1}
      ]
    }

    let color = d3.scaleSequential(d3.interpolateMagma).domain([6, 0])

    let pack = data => d3.pack()
    .size([400 - 2, 400 - 2])
    .padding(3)
    (d3.hierarchy(data)
    .sum(d => d.size))

    const root = pack(data)

    const node = svg.selectAll("g")
    .data(root.descendants())
    .enter().append("g")
      .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

  node.append("circle")
      .attr("r", d => d.r)
      .attr("fill", d => color(d.height));
  }

  render() { 
    return (
      <div ref="conduit" style={{height:500,width:500}}>
      </div>
    );
  }
}
