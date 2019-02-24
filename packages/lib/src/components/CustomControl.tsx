import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {CustomControlProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

const CustomControl = ({
  bindingPosition = 'RIGHT_TOP',
  children,
}: CustomControlProps): React.ReactPortal | null => {
  if (typeof document === 'undefined') return null
  const {state} = useContext(GoogleMapContext)
  const [container] = useState<HTMLDivElement>(document.createElement('div'))

  // Add the custom control to the map
  useEffect(() => {
    if (state.map === undefined) return
    state.map.controls[google.maps.ControlPosition[bindingPosition]].push(
      container,
    )
  }, [state.map])

  return ReactDOM.createPortal(children, container)
}

CustomControl.displayName = 'CustomControl'

export default CustomControl
