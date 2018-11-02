import React, { Component, Fragment } from 'react'
import { Form, Radio } from 'semantic-ui-react'
import { conduits } from '../constants.js'

export default class Conduit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  render() { 
    return (
      <Form>
        {conduits.map((conduit, i) => (
          <Form.Field key={i}>
            <Radio
              label={conduit.abbr}
              name='radioGroup'
              value={conduit.abbr}
            />
          <div>{conduit.name}</div>
          </Form.Field>
          ))}
      </Form>
    );
  }
}
