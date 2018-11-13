import React, { Fragment } from 'react'
import { Button, Popup } from 'semantic-ui-react'

const ConduitSizes = (props) => {
  let { selectedConduit, conduitSize, setSize } = props
  return (
    <div>
      <Button.Group basic>
      <Button toggle active={conduitSize === 'Auto' ? true : false} onClick={setSize.bind(this, 'Auto')}>
      Auto
      </Button>
      {selectedConduit.sizes &&
        <Fragment>
          {selectedConduit.sizes.map(size => (
            <Button toggle active={conduitSize === size.tradeSize ? true : false} onClick={setSize.bind(this, size.tradeSize)}>
              {`${size.tradeSize}"`}
            </Button>))}
        </Fragment>}
        </Button.Group>
    </div>
  )
}

export default ConduitSizes