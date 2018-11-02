import React from 'react';
import ReactDOM from 'react-dom';
import CirclePack from './components/CirclePack.jsx'
import { Button } from 'semantic-ui-react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  render () {

    return (
    <div>
      <h1>Hai</h1>
      <CirclePack />
      <Button>Click</Button>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));