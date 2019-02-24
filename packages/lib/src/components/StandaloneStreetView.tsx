import React from 'react'
import {StandaloneStreetViewProps} from '../common/types'
import BasicStreetView from './BasicStreetView'

const StandaloneStreetView = (props: StandaloneStreetViewProps) => (
  <BasicStreetView bindToMap={false} {...props} />
)

StandaloneStreetView.displayName = 'StandaloneStreetView'

export default StandaloneStreetView
