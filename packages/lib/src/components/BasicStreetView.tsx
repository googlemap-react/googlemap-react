import React, {useContext, useEffect, useState} from 'react'
import {
  DEFAULT_MAP_STYLE,
  DEFAULT_STREET_VIEW_OPTIONS,
} from '../common/constants'
import uuid from 'uuid/v1'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {useGoogleListener} from '../hooks'
import {BasicStreetViewProps} from '../common/types'

const BasicStreetView = ({
  id,
  className,
  style = DEFAULT_MAP_STYLE,
  opts = DEFAULT_STREET_VIEW_OPTIONS,
  bindToMap,
  onCloseClick,
  onPanoChanged,
  onPositionChanged,
  onPovChanged,
  onResize,
  onStatusChanged,
  onVisibleChanged,
  onZoomChanged,
}: BasicStreetViewProps) => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [streetView, setStreetView] = useState<
    google.maps.StreetViewPanorama | undefined
  >(undefined)
  const [streetViewId] = useState(
    id ? id : bindToMap ? 'street-view' : `street-view-${uuid()}`,
  )
  const [prevOpts, setPrevOpts] = useState<
    google.maps.StreetViewPanoramaOptions | undefined
  >(undefined)

  const addStreetView = (streetView: google.maps.StreetViewPanorama) =>
    dispatch({type: 'add_object', object: streetView, id: streetViewId})
  const removeStreetView = () =>
    dispatch({type: 'remove_object', id: streetViewId})

  // Handle StreetView creation and unregister
  useEffect(() => {
    if (state.map === undefined) return
    const streetView = new google.maps.StreetViewPanorama(
      document.getElementById(streetViewId) as HTMLElement,
      opts,
    )
    setStreetView(streetView)
    addStreetView(streetView)
    if (bindToMap) {
      state.map.setOptions({streetView: streetView})
    }
    return () => {
      if (bindToMap) {
        state.map && state.map.setOptions({streetView: undefined})
      }
      removeStreetView()
    }
  }, [state.map])

  useGoogleListener(streetView, [
    {name: 'closeclick', handler: onCloseClick},
    {name: 'pano_changed', handler: onPanoChanged},
    {name: 'position_changed', handler: onPositionChanged},
    {name: 'pov_changed', handler: onPovChanged},
    {name: 'resize', handler: onResize},
    {name: 'status_changed', handler: onStatusChanged},
    {name: 'visible_changed', handler: onVisibleChanged},
    {name: 'zoom_changed', handler: onZoomChanged},
  ])

  // Modify the google.maps.StreetViewPanorama object when component props change
  useEffect(() => {
    if (
      streetView === undefined ||
      opts === undefined ||
      JSON.stringify(opts) === JSON.stringify(prevOpts)
    )
      return
    streetView.setOptions(opts)
    setPrevOpts(opts)
  }, [opts])

  return <div className={className} id={streetViewId} style={style} />
}

BasicStreetView.displayName = 'BasicStreetView'

export default BasicStreetView
