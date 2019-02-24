import React, {useContext, useEffect, useState} from 'react'
import uuid from 'uuid/v1'
import {useGoogleListener} from '../hooks'
import {DEFAULT_CIRCLE_OPTIONS} from '../common/constants'
import {CircleProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

const Circle = ({
  id,
  opts = DEFAULT_CIRCLE_OPTIONS,
  onCenterChanged,
  onClick,
  onDoubleClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onMouseDown,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onRadiusChanged,
  onRightClick,
}: CircleProps) => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [circle, setCircle] = useState<google.maps.Circle | undefined>(
    undefined,
  )
  const [circleId] = useState(id ? id : `circle-${uuid()}`)
  const addCircle = (circle: google.maps.Circle) =>
    dispatch({type: 'add_object', object: circle, id: circleId})
  const removeCircle = () => dispatch({type: 'remove_object', id: circleId})

  useEffect(() => {
    if (state.map === undefined) return
    const circle = new google.maps.Circle({
      ...opts,
      map: state.map,
    })
    setCircle(circle)

    // Add the circle to state.objects
    addCircle(circle)

    // Remove the circle when the component is unmounted
    return () => removeCircle()
  }, [state.map])

  // Register google map event listeners
  useGoogleListener(circle, [
    {name: 'center_changed', handler: onCenterChanged},
    {name: 'click', handler: onClick},
    {name: 'dblclick', handler: onDoubleClick},
    {name: 'drag', handler: onDrag},
    {name: 'dragend', handler: onDragEnd},
    {name: 'dragstart', handler: onDragStart},
    {name: 'mousedown', handler: onMouseDown},
    {name: 'mouseout', handler: onMouseOut},
    {name: 'mouseover', handler: onMouseOver},
    {name: 'mouseup', handler: onMouseUp},
    {name: 'radius_changed', handler: onRadiusChanged},
    {name: 'rightclick', handler: onRightClick},
  ])

  // Modify the google.maps.Circle object when component props change
  useEffect(() => {
    if (circle === undefined) return
    circle.setOptions(opts)
  }, [opts])

  return null
}

Circle.displayName = 'Circle'

export default Circle
