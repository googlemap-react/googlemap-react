import React from 'react'
import BasicAutocomplete from './BasicAutocomplete'
import {StandaloneAutocompleteProps} from '../common/types'

const StandaloneAutocomplete = (props: StandaloneAutocompleteProps) => (
  <BasicAutocomplete {...props} />
)

StandaloneAutocomplete.displayName = 'StandaloneAutocomplete'

export default StandaloneAutocomplete
