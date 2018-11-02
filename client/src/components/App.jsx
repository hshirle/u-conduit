import React, { Component, Fragment } from 'react'
import Calculator from './Calculator.jsx'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  render () {
    return (
    <Fragment>
      <Calculator />
    </Fragment>
    )
  }
}