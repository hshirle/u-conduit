import React, { Component, Fragment } from 'react'
import { Button, Popup } from 'semantic-ui-react'

export default class Conduit extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    let { setConduit, selectedConduit, conduits } = this.props
    return (
      <Fragment>
        {conduits.map((conduit, i) => (
            <Popup
            key={ i + 1 }
            content={ conduit.name }
            trigger={
              <Button 
                toggle
                active={ selectedConduit.abbr === conduit.abbr ? true : false }
                onClick={setConduit.bind(this,conduit)}
                value={ conduit }>
                { conduit.abbr }
              </Button>
            }  />
          ))}
      </Fragment>
    );
  }
}
