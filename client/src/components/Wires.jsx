import React, { Component } from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'

export default class Wires extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { wires } = this.props
    return (
      <span>{wires.map(wire => {
        let options = wire.sizes.map((size, i) => {
          return {
            key: i + 1,
            value: size.area,
            text: size.area
          }
        })
        return (
            <Dropdown key={wire.type} button text={wire.type} options={options}/>
          )
      })}</span>
    );
  }
}
