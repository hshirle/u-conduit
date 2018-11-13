import React, { Component, Fragment } from 'react'
import Calculator from './Calculator.jsx'
import axios from 'axios'
import { Container } from 'semantic-ui-react'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conduits: [],
      wires: []
    }
    this.getConduits = this.getConduits.bind(this)
    this.getWires = this.getWires.bind(this)
  }

  componentDidMount() {
    this.getConduits()
    this.getWires()
  }

  getConduits() {
    axios.get('/conduits')
    .then(({ data }) => this.setState({ conduits: data }))
    .catch(err => console.log(err))
  }

  getWires() {
    axios.get('/wires')
    .then(({ data }) => this.setState({ wires: data }))
    .catch(err => console.log(err))
  }


  render() {
    let { conduits, wires } = this.state
    return (
      <Fragment>
      <Container>
        <Calculator wires={wires} conduits={conduits} />
      </Container>
      </Fragment>
    )
  }
}