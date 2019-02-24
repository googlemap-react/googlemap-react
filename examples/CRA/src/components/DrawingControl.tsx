import React, {useState} from 'react'
import {CustomControl, DrawingManager} from '../lib'

const DrawingControl = () => {
  const [state, setState] = useState<'INITIAL' | 'DRAWING' | 'PAUSED'>(
    'INITIAL',
  )
  return (
    <>
      <CustomControl bindingPosition="LEFT_TOP">
        <button
          onClick={() =>
            setState(state => (state === 'DRAWING' ? 'PAUSED' : 'DRAWING'))
          }
        >
          {`${
            state === 'INITIAL'
              ? 'Start'
              : state === 'DRAWING'
              ? 'Pause'
              : 'Resume'
          } Drawing`}
        </button>
        {state !== 'INITIAL' ? (
          <button onClick={() => setState('INITIAL')}>Stop Drawing</button>
        ) : null}
      </CustomControl>
      {state !== 'INITIAL' ? (
        <DrawingManager
          opts={{
            drawingControl: state !== 'PAUSED',
          }}
        />
      ) : null}
    </>
  )
}

DrawingControl.displayName = 'DrawingControl'

export default DrawingControl
