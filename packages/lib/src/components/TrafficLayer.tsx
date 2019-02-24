import React from 'react'
import Layer from './Layer'
import {TrafficLayerProps} from '../common/types'

const TrafficLayer = ({opts}: TrafficLayerProps) => (
  <Layer type="traffic" opts={opts} />
)

TrafficLayer.displayName = 'TrafficLayer'

export default TrafficLayer
