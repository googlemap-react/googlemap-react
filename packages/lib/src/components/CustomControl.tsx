import React, {useContext, useEffect, useState, useRef} from 'react'
import ReactDOM from 'react-dom'
import {CustomControlProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

const CustomControl = ({
  bindingPosition = 'RIGHT_TOP',
  children,
}: CustomControlProps): React.ReactPortal | null => {
  const {state} = useContext(GoogleMapContext)
  const containerRef = useRef<HTMLDivElement>()
  const [mounted, setMounted] = useState(false)
  const [lastBindingPosition, setLastBindingPosition] = useState(
    bindingPosition,
  )

  // Add the custom control to the map
  useEffect(() => {
    if (state.map === undefined) return

    containerRef.current = document.createElement('div')

    if (bindingPosition !== lastBindingPosition) {
      const last =
        state.map.controls[google.maps.ControlPosition[lastBindingPosition]]
      const lastArray = last.getArray()
      last.removeAt(
        lastArray.findIndex(element => element === containerRef.current),
      )
      setLastBindingPosition(bindingPosition)
    }

    state.map.controls[google.maps.ControlPosition[bindingPosition]].push(
      containerRef.current,
    )

    setMounted(true)
  }, [state.map, bindingPosition])

  // @ts-ignore
  return mounted ? ReactDOM.createPortal(children, containerRef.current) : null
}

CustomControl.displayName = 'CustomControl'

export default CustomControl
