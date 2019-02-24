import React, {useContext, useEffect, useState} from 'react'
import uuid from 'uuid/v1'
import {useGoogleListener} from '../hooks'
import {DEFAULT_RECTANGLE_OPTIONS} from '../common/constants'
import {RectangleProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

const Rectangle = ({
  id,
  opts = DEFAULT_RECTANGLE_OPTIONS,
  onBoundsChanged,
  onClick,
  onDoubleClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onMouseDown,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onRightClick,
}: RectangleProps) => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [rectangle, setRectangle] = useState<google.maps.Rectangle | undefined>(
    undefined,
  )
  const [rectangleId] = useState(id ? id : `rectangle-${uuid()}`)

  const addRectangle = (rectangle: google.maps.Rectangle) =>
    dispatch({type: 'add_object', object: rectangle, id: rectangleId})
  const removeRectangle = () =>
    dispatch({type: 'remove_object', id: rectangleId})

  useEffect(() => {
    if (state.map === undefined) return
    setRectangle(
      new google.maps.Rectangle({
        ...opts,
        map: state.map,
      }),
    )
  }, [state.map])

  useEffect(() => {
    if (rectangle === undefined) return

    // Add the rectangle to state.objects
    addRectangle(rectangle)

    // Remove the rectangle when the component is unmounted
    return () => removeRectangle()
  }, [rectangle])

  // Register google map event listeners
  useGoogleListener(rectangle, [
    {name: 'bounds_changed', handler: onBoundsChanged},
    {name: 'click', handler: onClick},
    {name: 'dblclick', handler: onDoubleClick},
    {name: 'drag', handler: onDrag},
    {name: 'dragend', handler: onDragEnd},
    {name: 'dragstart', handler: onDragStart},
    {name: 'mousedown', handler: onMouseDown},
    {name: 'mouseout', handler: onMouseOut},
    {name: 'mouseover', handler: onMouseOver},
    {name: 'mouseup', handler: onMouseUp},
    {name: 'rightclick', handler: onRightClick},
  ])

  // Modify the google.maps.Rectangle object when component props change
  useEffect(() => {
    if (rectangle === undefined) return
    rectangle.setOptions(opts)
  }, [opts])

  return null
}

Rectangle.displayName = 'Rectangle'

export default Rectangle
