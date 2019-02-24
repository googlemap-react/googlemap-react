import {useState} from 'react'
import {CustomControl, DrawingManager} from '@googlemap-react/core'

export default () => {
  const [drawing, setDrawing] = useState(false)
  return (
    <>
      <CustomControl
        bindingPosition="LEFT_TOP"
      >
        <button 
          onClick={() => setDrawing(drawing => !drawing)}
        >
          {`${drawing ? 'stop' : 'start'} drawing`}
        </button>
      </CustomControl>
      {drawing ? <DrawingManager /> : null}
    </>
  )
}