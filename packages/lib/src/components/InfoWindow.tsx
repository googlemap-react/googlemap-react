import React, {useContext, useEffect, useState} from 'react'
import {DEFAULT_INFO_WINDOW_OPTIONS} from '../common/constants'
import {InfoWindowProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {useGoogleListener} from '../hooks'

const InfoWindow = ({
  anchorId,
  opts = DEFAULT_INFO_WINDOW_OPTIONS,
  visible,
  onCloseClick,
  onContentChanged,
  onDOMReady,
  onPositionChanged,
  onZIndexChanged,
}: InfoWindowProps) => {
  const {state} = useContext(GoogleMapContext)
  const [infoWindow, setInfoWindow] = useState<
    google.maps.InfoWindow | undefined
  >(undefined)

  useEffect(() => {
    if (state.map === undefined) return
    const infoWindow = new google.maps.InfoWindow(opts)
    setInfoWindow(infoWindow)

    const anchor = anchorId ? state.objects.get(anchorId) : undefined

    // Open or close the info window according to the `visible` prop
    if (visible) infoWindow.open(state.map, anchor)
    else infoWindow.close()

    // Close the info window when the component is unmounted
    return () => infoWindow.close()
  }, [state.map, visible, anchorId && state.objects.get(anchorId)])

  // Register event listeners
  useGoogleListener(infoWindow, [
    {name: 'closeclick', handler: onCloseClick},
    {name: 'content_changed', handler: onContentChanged},
    {name: 'domready', handler: onDOMReady},
    {name: 'position_changed', handler: onPositionChanged},
    {name: 'zindex_changed', handler: onZIndexChanged},
  ])

  // Modify the google.maps.InfoWindow object when component props change
  useEffect(() => {
    if (infoWindow === undefined) return
    infoWindow.setOptions(opts)
  }, [opts])

  return null
}

InfoWindow.displayName = 'InfoWindow'

export default InfoWindow
