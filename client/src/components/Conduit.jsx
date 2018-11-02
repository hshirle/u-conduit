import React, { Component, Fragment } from 'react'
import { Form, Button, Popup } from 'semantic-ui-react'
import { conduits } from '../constants.js'

export default class Conduit extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    let { setConduit, currConduit } = this.props
    return (
      <Fragment>
        {conduits.map((conduit, i) => (
            <Popup trigger={<Button 
            toggle
            active={currConduit === conduit.abbr ? true : false}
            onClick={(e) => setConduit(e)}
              value={conduit.abbr}>{conduit.abbr}</Button>
            } content={conduit.name} />
          ))}
      </Fragment>
    );
  }
}
