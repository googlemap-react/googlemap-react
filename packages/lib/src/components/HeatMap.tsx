import React, {useContext, useEffect, useState} from 'react'
import uuid from 'uuid/v1'
import {DEFAULT_HEAT_MAP_OPTIONS} from '../common/constants'
import {HeatMapProps, WeightedLatLng} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import withSecurityBounder from '../hocs/SecurityBounder'

const transformLatLng = (
  orig: WeightedLatLng,
): google.maps.visualization.WeightedLocation => ({
  location: new google.maps.LatLng(orig.lat, orig.lng),
  weight: orig.weight || 1,
})

export const HeatMap = ({
  id,
  opts = DEFAULT_HEAT_MAP_OPTIONS,
}: HeatMapProps) => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [heatMap, setHeatMap] = useState<
    google.maps.visualization.HeatmapLayer | undefined
  >(undefined)
  const [heatMapId] = useState(id ? id : `heat-map-${uuid()}`)
  const addHeatMap = (groundOverlay: google.maps.visualization.HeatmapLayer) =>
    dispatch({type: 'add_object', object: groundOverlay, id: heatMapId})
  const removeHeatMap = () => dispatch({type: 'remove_object', id: heatMapId})
  useEffect(() => {
    if (state.map === undefined) return
    const heatMap = new google.maps.visualization.HeatmapLayer({
      ...opts,
      data: opts.data.map(latLng => transformLatLng(latLng)),
      map: state.map,
    })
    setHeatMap(heatMap)
    addHeatMap(heatMap)
    return () => removeHeatMap()
  }, [state.map])

  useEffect(() => {
    if (heatMap === undefined || opts.data === undefined) return
    heatMap.setData(opts.data.map(latLng => transformLatLng(latLng)))
  }, [opts.data])

  return null
}

export const SafeHeatMap = withSecurityBounder(HeatMap)
