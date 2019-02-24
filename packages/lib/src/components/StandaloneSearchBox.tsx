import React from 'react'
import BasicSearchBox from './BasicSearchBox'
import {StandaloneSearchBoxProps} from '../common/types'

const StandaloneSearchBox = (props: StandaloneSearchBoxProps) => (
  <BasicSearchBox {...props} />
)

StandaloneSearchBox.displayName = 'StandaloneSearchBox'

export default StandaloneSearchBox
