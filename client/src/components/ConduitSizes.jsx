import React, { Fragment } from 'react'
import { Button, Popup } from 'semantic-ui-react'

const ConduitSizes = (props) => {
  let { selectedConduit } = props
  return (
  <Fragment>
    <Button>Auto</Button>
  {selectedConduit.sizes && 
  <div>{selectedConduit.sizes.map(size => <Button>{`${size.tradeSize}"`}</Button>)}</div>}
  </Fragment>
)}

export default ConduitSizes