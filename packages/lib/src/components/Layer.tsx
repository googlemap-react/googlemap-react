import React, {useContext, useEffect, useState} from 'react'
import {GoogleMapLayer, LayerProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

const Layer = ({type, opts}: LayerProps) => {
  const layerId = `${type}-layer`
  const {state, dispatch} = useContext(GoogleMapContext)
  const [layer, setLayer] = useState<GoogleMapLayer | undefined>(undefined)

  const addLayer = (layer: GoogleMapLayer) =>
    dispatch({
      type: 'add_object',
      object: layer,
      id: layerId,
    })
  const removeLayer = () => dispatch({type: 'remove_object', id: layerId})

  useEffect(() => {
    if (state.map === undefined) return
    const layerNameToClass = {
      bicycling: google.maps.BicyclingLayer,
      traffic: google.maps.TrafficLayer,
      transit: google.maps.TransitLayer,
    }
    const layer =
      type === 'traffic'
        ? new layerNameToClass[type](opts)
        : new layerNameToClass[type]()
    layer.setMap(state.map)
    setLayer(layer)

    // Add the layer to state.objects
    addLayer(layer)

    // Remove the layer when the component is unmounted
    return () => removeLayer()
  }, [state.map])

  useEffect(() => {
    if (type !== 'traffic' || opts === undefined || layer === undefined) return
    ;(layer as google.maps.TrafficLayer).setOptions(opts)
  }, [opts])

  return null
}

Layer.displayName = 'layer'

export default Layer
