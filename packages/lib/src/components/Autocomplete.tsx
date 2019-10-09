import React from 'react'
import {AutocompleteProps} from '../common/types'
import BasicAutocomplete from './BasicAutocomplete'

const Autocomplete = (props: AutocompleteProps) => (
  <BasicAutocomplete {...props} />
)

Autocomplete.displayName = 'Autocomplete'

export default Autocomplete
