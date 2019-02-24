import React from 'react'
import {SearchBoxProps} from '../common/types'
import BasicSearchBox from './BasicSearchBox'

const SearchBox = (props: SearchBoxProps) => <BasicSearchBox {...props} />

SearchBox.displayName = 'SearchBox'

export default SearchBox
