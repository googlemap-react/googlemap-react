import React from 'react'
import {StreetViewProps} from '../common/types'
import BasicStreetView from './BasicStreetView'

const StreetView = (props: StreetViewProps) => (
  <BasicStreetView bindToMap {...props} />
)

StreetView.displayName = 'StreetView'

export default StreetView
