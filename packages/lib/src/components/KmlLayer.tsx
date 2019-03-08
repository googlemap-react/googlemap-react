import React, {useContext, useEffect, useState} from 'react'
import uuid from 'uuid/v1'
import {DEFAULT_KML_LAYER_OPTIONS} from '../common/constants'
import {KmlLayerProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {useGoogleListener, useMemoizedOptions} from '../hooks'

const KmlLayer = ({
  id,
  opts = DEFAULT_KML_LAYER_OPTIONS,
  onClick,
  onDefaultViewportChanged,
  onStatusChanged,
}: KmlLayerProps) => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [prevOpts, setPrevOpts] = useState('')
  const [kmlLayer, setKmlLayer] = useState<google.maps.KmlLayer | undefined>(
    undefined,
  )
  const [kmlLayerId] = useState(id ? id : `kml-layer-${uuid()}`)

  const addKmlLayer = (kmlLayer: google.maps.KmlLayer) =>
    dispatch({
      type: 'add_object',
      object: kmlLayer,
      id: kmlLayerId,
    })
  const removeKmlLayer = () => dispatch({type: 'remove_object', id: kmlLayerId})

  // Create KmlLayer when map is ready
  useEffect(() => {
    if (state.map === undefined) return
    const kmlLayer = new google.maps.KmlLayer({...opts, map: state.map})
    setKmlLayer(kmlLayer)
    setPrevOpts(JSON.stringify(opts))

    // Add the kmlLayer to state.objects
    addKmlLayer(kmlLayer)

    // Remove the kmlLayer when the component is unmounted
    return () => removeKmlLayer()
  }, [state.map])

  useGoogleListener(kmlLayer, [
    {name: 'click', handler: onClick},
    {name: 'defaultviewport_changed', handler: onDefaultViewportChanged},
    {name: 'status_changed', handler: onStatusChanged},
  ])

  useMemoizedOptions(kmlLayer, opts, prevOpts, setPrevOpts)

  return null
}

KmlLayer.displayName = 'KmlLayer'

export default KmlLayer
