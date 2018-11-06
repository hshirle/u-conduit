import React, { Component, Fragment } from 'react';
import CirclePack from './CirclePack.jsx'
import Conduit from './Conduit.jsx'
import ConduitSizes from './ConduitSizes.jsx'
import Conductor from './Conductor.jsx'
import { Grid, Image } from 'semantic-ui-react'


export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedConduit: { abbr: '' },
      selectedConduitSize: '',
      conductor: []
    }
    this.setConduit = this.setConduit.bind(this)
  }

  setConduit(conduit) {
    this.setState({ selectedConduit: conduit})
  }

  // setConduitSizes(e) {
  //   this.setState({ selectedConduitSize: 'w'})
  // }

  render() {
    let { selectedConduit, conductor } = this.state
    let { conduits } = this.props
    return (
      <Fragment>
        <Grid>
          <Grid.Row>
            <Conduit selectedConduit={selectedConduit} conduits={conduits} setConduit={this.setConduit} />
          </Grid.Row>
          <Grid.Row>
            {selectedConduit.sizes && <ConduitSizes selectedConduit={selectedConduit} conduits={conduits} />}
          </Grid.Row>
          <Conductor />
          <CirclePack conduit={selectedConduit} conductor={conductor} />
        </Grid>
      </Fragment>
    );
  }
}
 