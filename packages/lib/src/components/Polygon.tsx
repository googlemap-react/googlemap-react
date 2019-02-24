import React, {useContext, useEffect, useState} from 'react'
import uuid from 'uuid/v1'
import {useGoogleListener} from '../hooks'
import {DEFAULT_POLYGON_OPTIONS} from '../common/constants'
import {PolygonProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

const Polygon = ({
  id,
  opts = DEFAULT_POLYGON_OPTIONS,
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
}: PolygonProps) => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [polygon, setPolygon] = useState<google.maps.Polygon | undefined>(
    undefined,
  )
  const [polygonId] = useState(id ? id : `polygon-${uuid()}`)

  const addPolygon = (polygon: google.maps.Polygon) =>
    dispatch({type: 'add_object', object: polygon, id: polygonId})
  const removePolygon = () => dispatch({type: 'remove_object', id: polygonId})

  useEffect(() => {
    if (state.map === undefined) return
    const polygon = new google.maps.Polygon({
      ...opts,
      map: state.map,
    })
    setPolygon(polygon)

    // Add the polygon to state.objects
    addPolygon(polygon)

    // Remove the polygon when the component is unmounted
    return () => removePolygon()
  }, [state.map])

  // Register google map event listeners
  useGoogleListener(polygon, [
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

  // Modify the google.maps.Polygon object when component props change
  useEffect(() => {
    if (polygon === undefined) return
    polygon.setOptions(opts)
  }, [opts])

  return null
}

Polygon.displayName = 'Polygon'

export default Polygon
