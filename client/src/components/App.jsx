import React, { Component, Fragment } from 'react'
import Calculator from './Calculator.jsx'
import axios from 'axios'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conduits: []
    }
  }

  componentDidMount() {
    axios.get('/conduits')
    .then(({ data }) => this.setState({ conduits: data }))
    .catch(err => console.log(err))
  }


  render () {
    let { conduits } = this.state
    return (
    <Fragment>
      <Calculator conduits={conduits}/>
    </Fragment>
    )
  }
}