import React, {useEffect, useContext, useState} from 'react'
import uuid from 'uuid/v1'
import {useGoogleAPI, useGoogleListener} from '../hooks'
import {
  DEFAULT_MAP_OPTIONS,
  DEFAULT_MAP_STYLE,
  GOOGLE_MAP_LIBRARY_NAMES,
} from '../common/constants'
import {MapBoxProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

const MapBox = ({
  apiKey = '',
  language,
  region,
  className,
  style = DEFAULT_MAP_STYLE,
  opts = DEFAULT_MAP_OPTIONS,
  useDrawing = false,
  useGeometry = false,
  usePlaces = false,
  useVisualization = false,
  LoadedComponent = null,
  LoadingComponent = <p>Loading...</p>,
  onBoundsChanged,
  onCenterChanged,
  onClick,
  onDoubleClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onHeadingChanged,
  onIdle,
  onMapTypeIdChanged,
  onMouseMove,
  onMouseOut,
  onMouseOver,
  onProjectionChanged,
  onRightClick,
  onTilesLoaded,
  onTiltChanged,
  onZoomChanged,
}: MapBoxProps) => {
  // Get access to the Google Map context
  const {state, dispatch} = useContext(GoogleMapContext)
  const [prevOpts, setPrevOpts] = useState('')

  // Generate a random id for the DOM node where Google Map will be inserted
  const [mapItemId] = useState(`map-${uuid()}`)

  // Define action dispatchers
  const initMap = (
    map: google.maps.Map,
    places?: google.maps.places.PlacesService,
  ) => dispatch({type: 'init_map', map: map, places: places})
  const reset = () => dispatch({type: 'reset'})

  // Construct the library param
  const libraries = {
    drawing: useDrawing,
    geometry: useGeometry,
    places: usePlaces,
    visualization: useVisualization,
  }
  const libraryParam = GOOGLE_MAP_LIBRARY_NAMES.filter(
    library => libraries[library],
  ).join(',')
  const loaded = useGoogleAPI({
    apiKey: apiKey,
    libraryParam: libraryParam === '' ? '' : `&libraries=${libraryParam}`,
    languageParam: language === undefined ? '' : `&language=${language}`,
    regionParam: region === undefined ? '' : `&region=${region}`,
  })

  // Load Google Map
  useEffect(() => {
    if (!loaded) return
    const map = new google.maps.Map(document.getElementById(mapItemId), opts)
    setPrevOpts(JSON.stringify(opts))
    if (usePlaces) {
      const places = new google.maps.places.PlacesService(map)
      initMap(map, places)
    } else initMap(map)
    return () => reset()
  }, [loaded])

  // Register event listeners
  useGoogleListener(state.map, [
    {name: 'bounds_changed', handler: onBoundsChanged},
    {name: 'center_changed', handler: onCenterChanged},
    {name: 'click', handler: onClick},
    {name: 'dblclick', handler: onDoubleClick},
    {name: 'drag', handler: onDrag},
    {name: 'dragend', handler: onDragEnd},
    {name: 'dragstart', handler: onDragStart},
    {name: 'heading_changed', handler: onHeadingChanged},
    {name: 'idle', handler: onIdle},
    {name: 'maptypeid_changed', handler: onMapTypeIdChanged},
    {name: 'mousemove', handler: onMouseMove},
    {name: 'mouseout', handler: onMouseOut},
    {name: 'mouseover', handler: onMouseOver},
    {name: 'projection_changed', handler: onProjectionChanged},
    {name: 'rightclick', handler: onRightClick},
    {name: 'tilesloaded', handler: onTilesLoaded},
    {name: 'tilt_changed', handler: onTiltChanged},
    {name: 'zoom_changed', handler: onZoomChanged},
  ])

  // Modify the google.maps.Map object when component props change
  useEffect(() => {
    if (
      state.map === undefined ||
      opts === undefined ||
      JSON.stringify(opts) === prevOpts
    )
      return
    state.map.setOptions(opts)
    setPrevOpts(JSON.stringify(opts))
  }, [opts])

  // Render <MapBox>
  return (
    <>
      {loaded ? LoadedComponent : LoadingComponent}
      {typeof document !== 'undefined' ? (
        <div id={mapItemId} style={style} className={className} />
      ) : null}
    </>
  )
}

MapBox.displayName = 'MapBox'

export default MapBox
