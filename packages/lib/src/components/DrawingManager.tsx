import React, {useContext, useEffect, useRef, useState} from 'react'
import {DEFAULT_DRAWING_MANAGER_OPTIONS} from '../common/constants'
import {DrawingManagerProps, GoogleMapShape} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {useGoogleListener, useMemoizedOptions} from '../hooks'

const DrawingManager = ({
  opts = DEFAULT_DRAWING_MANAGER_OPTIONS,
  onCircleComplete,
  onMarkerComplete,
  onOverlayComplete,
  onPolygonComplete,
  onPolylineComplete,
  onRectangleComplete,
}: DrawingManagerProps) => {
  const drawingManagerId = 'drawing-manager'
  const {state, dispatch} = useContext(GoogleMapContext)
  const [prevOpts, setPrevOpts] = useState('')
  const [drawingManager, setDrawingManager] = useState<
    google.maps.drawing.DrawingManager | undefined
  >(undefined)
  const [shapeCount, setShapeCount] = useState(0)
  const shapeCountRef = useRef(0)
  shapeCountRef.current = shapeCount
  const addShape = (shape: GoogleMapShape) =>
    setShapeCount(shapeCount => {
      dispatch({
        type: 'add_object',
        object: shape,
        id: `${drawingManagerId}-${shapeCount}`,
      })
      return shapeCount + 1
    })

  const removeShapes = () => {
    for (let i = 0; i < shapeCountRef.current; i++) {
      dispatch({type: 'remove_object', id: `${drawingManagerId}-${i}`})
    }
  }

  const addDrawingManager = (
    drawingManager: google.maps.drawing.DrawingManager,
  ) =>
    dispatch({
      type: 'add_object',
      object: drawingManager,
      id: drawingManagerId,
    })

  const removeDrawingManager = () => {
    removeShapes()
    dispatch({type: 'remove_object', id: drawingManagerId})
  }

  useEffect(() => {
    if (state.map === undefined) return
    const drawingManager = new google.maps.drawing.DrawingManager({
      ...opts,
      map: state.map,
    })
    setDrawingManager(drawingManager)
    setPrevOpts(JSON.stringify(opts))

    // Add DrawingManager to state.objects
    addDrawingManager(drawingManager)

    // Remove DrawingManager and all shapes
    return () => removeDrawingManager()
  }, [state.map])

  useGoogleListener(drawingManager, [
    {name: 'circlecomplete', handler: onCircleComplete},
    {name: 'markercomplete', handler: onMarkerComplete},
    {name: 'overlaycomplete', handler: onOverlayComplete},
    {
      name: 'overlaycomplete',
      handler: (event: google.maps.drawing.OverlayCompleteEvent) =>
        addShape(event.overlay),
    },
    {name: 'polygoncomplete', handler: onPolygonComplete},
    {name: 'polylinecomplete', handler: onPolylineComplete},
    {name: 'rectanglecomplete', handler: onRectangleComplete},
  ])

  useMemoizedOptions(drawingManager, opts, prevOpts, setPrevOpts)

  return null
}

DrawingManager.displayName = 'DrawingManager'

export default DrawingManager
