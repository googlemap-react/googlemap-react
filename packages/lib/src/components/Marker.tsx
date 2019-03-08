import React, {useContext, useEffect, useState} from 'react'
import uuid from 'uuid/v1'
import {DEFAULT_MARKER_OPTIONS} from '../common/constants'
import {MarkerProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {useGoogleListener, useMemoizedOptions} from '../hooks'

const Marker = ({
  id,
  opts = DEFAULT_MARKER_OPTIONS,
  onAnimationChanged,
  onClick,
  onClickableChanged,
  onCursorChanged,
  onDoubleClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onDraggableChanged,
  onFlatChanged,
  onIconChanged,
  onMouseDown,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onPositionChanged,
  onRightClick,
  onShapeChanged,
  onTitleChanged,
  onVisibleChanged,
  onZIndexChanged,
}: MarkerProps) => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [prevOpts, setPrevOpts] = useState('')
  const [marker, setMarker] = useState<google.maps.Marker | undefined>(
    undefined,
  )
  const [markerId] = useState(id ? id : `marker-${uuid()}`)

  const addMarker = (marker: google.maps.Marker) =>
    dispatch({type: 'add_object', object: marker, id: markerId})

  const removeMarker = () => dispatch({type: 'remove_object', id: markerId})

  useEffect(() => {
    if (state.map === undefined) return
    const marker = new google.maps.Marker({...opts, map: state.map})
    setMarker(marker)
    setPrevOpts(JSON.stringify(opts))

    // Add the marker to state.objects
    addMarker(marker)

    // Remove the marker when the component is unmounted
    return () => removeMarker()
  }, [state.map])

  // Register event listeners
  useGoogleListener(marker, [
    {name: 'animation_changed', handler: onAnimationChanged},
    {name: 'click', handler: onClick},
    {name: 'clickable_changed', handler: onClickableChanged},
    {name: 'cursor_changed', handler: onCursorChanged},
    {name: 'dblclick', handler: onDoubleClick},
    {name: 'drag', handler: onDrag},
    {name: 'dragend', handler: onDragEnd},
    {name: 'draggable_changed', handler: onDraggableChanged},
    {name: 'dragstart', handler: onDragStart},
    {name: 'flat_changed', handler: onFlatChanged},
    {name: 'icon_changed', handler: onIconChanged},
    {name: 'mousedown', handler: onMouseDown},
    {name: 'mouseout', handler: onMouseOut},
    {name: 'mouseover', handler: onMouseOver},
    {name: 'mouseup', handler: onMouseUp},
    {name: 'position_changed', handler: onPositionChanged},
    {name: 'rightclick', handler: onRightClick},
    {name: 'shape_changed', handler: onShapeChanged},
    {name: 'title_changed', handler: onTitleChanged},
    {name: 'visible_changed', handler: onVisibleChanged},
    {name: 'zindex_changed', handler: onZIndexChanged},
  ])

  // Modify the GoogleMapMarker object when component props change
  useMemoizedOptions(marker, opts, prevOpts, setPrevOpts)

  return null
}

Marker.displayName = 'Marker'

export default Marker
