import React, {useState} from 'react'
import {StreetView} from '../lib'

const StreetViewControl = () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <button onClick={() => setShow(show => !show)}>
        click to {show ? 'close the' : 'open a'} StreetView{' '}
      </button>
      {show ? <StreetView /> : null}
    </>
  )
}

StreetViewControl.displayName = 'StreetViewControl'

export default StreetViewControl
