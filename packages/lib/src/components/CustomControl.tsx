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
  const [lastBindingPosition, setLastBindingPosition] = useState(
    bindingPosition,
  )

  // Add the custom control to the map
  useEffect(() => {
    if (state.map === undefined) return
    if (bindingPosition !== lastBindingPosition) {
      const last =
        state.map.controls[google.maps.ControlPosition[lastBindingPosition]]
      const lastArray = last.getArray()
      last.removeAt(lastArray.findIndex(element => element === container))
      setLastBindingPosition(bindingPosition)
    }
    state.map.controls[google.maps.ControlPosition[bindingPosition]].push(
      container,
    )
  }, [state.map, bindingPosition])

  return ReactDOM.createPortal(children, container)
}

CustomControl.displayName = 'CustomControl'

export default CustomControl
