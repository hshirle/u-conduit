import React, { Component, Fragment } from 'react';
import CirclePack from './CirclePack.jsx'
import Conduit from './Conduit.jsx'
import Conductor from './Conductor.jsx'

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conduit: 'RMC',
      conduitSize: '',
      conductor: []
    }
    this.setConduit = this.setConduit.bind(this)
  }

  setConduit(e) {
    this.setState({ conduit: e.target.value})
  }

  render() {
    let { conduit, conductor } = this.state
    return (
      <Fragment>
        <Conduit currConduit={conduit} setConduit={this.setConduit} />
        <Conductor />
        <CirclePack conduit={conduit} conductor={conductor} />
      </Fragment>
    );
  }
}
 