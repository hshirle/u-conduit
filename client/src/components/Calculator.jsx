import React, { Component, Fragment } from 'react';
import CirclePack from './CirclePack.jsx'
import Conduits from './Conduits.jsx'
import ConduitSizes from './ConduitSizes.jsx'
import Wires from './Wires.jsx'
import { Grid, Image } from 'semantic-ui-react'


export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedConduit: { abbr: '' },
      conduitSize: '',
      totalWires: []
    }
    this.setConduit = this.setConduit.bind(this)
    this.setConduitSize = this.setConduitSize.bind(this)
    this.addWire = this.addWire.bind(this)
  }

  setConduit(conduit) {
    this.setState({ selectedConduit: conduit})
  }

  setConduitSize(size) {
    this.setState({ conduitSize: size })
  }
  
  addWire(wire) {
    this.setState((state) => (
      {totalWires: state.totalWires.push(wire)}
    ))
  }

  render() {
    let { selectedConduit, conduitSize, totalWires } = this.state
    let { conduits, wires } = this.props
    console.log(wires)
    return (
  
        <Grid className="center">
          <Grid.Row>
            <Grid.Column >
              <h2 className="theme-header">Select Conduit</h2>
              <Conduits selectedConduit={selectedConduit} conduits={conduits} setConduit={this.setConduit} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {<ConduitSizes setSize={this.setConduitSize} conduitSize={conduitSize} selectedConduit={selectedConduit} conduits={conduits} />}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          <Grid.Column>
          <h2 className="theme-header">Add Wires</h2>
            <Wires addWire={this.addWire} wires={wires}/>
            </Grid.Column>
          </Grid.Row>
          <CirclePack conduit={selectedConduit} wires={totalWires} />
        </Grid>
  
    );
  }
}
 