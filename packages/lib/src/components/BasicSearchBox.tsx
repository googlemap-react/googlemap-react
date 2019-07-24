import React, {useContext, useEffect, useState} from 'react'
import ReactDOMServer from 'react-dom/server'
import uuid from 'uuid/v1'
import {useGoogleListener} from '../hooks'
import {DEFAULT_SEARCH_BOX_OPTIONS} from '../common/constants'
import {BasicSearchBoxProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

const BasicSearchBox = ({
  id,
  opts = DEFAULT_SEARCH_BOX_OPTIONS,
  onPlacesChanged,
  bindingPosition,
  ...restProps
}: BasicSearchBoxProps) => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [searchBox, setSearchBox] = useState<
    google.maps.places.SearchBox | undefined
  >(undefined)
  const [searchBoxId] = useState(id ? id : `search-box-${uuid()}`)
  const [container] = useState(
    document
      .createRange()
      .createContextualFragment(
        ReactDOMServer.renderToString(
          <input id={searchBoxId} {...restProps} />,
        ),
      ).firstElementChild,
  )
  const [lastBindingPosition, setLastBindingPosition] = useState(
    bindingPosition,
  )

  const addSearch = (search: google.maps.places.SearchBox) =>
    dispatch({type: 'add_object', object: search, id: searchBoxId})
  const removeSearch = () => dispatch({type: 'remove_object', id: searchBoxId})

  // Create google.maps.places.SearchBox
  useEffect(() => {
    if (state.map === undefined || state.places === undefined) return
    const inputNode = (bindingPosition
      ? container
      : document.getElementById(searchBoxId)) as HTMLInputElement
    const searchBox = new google.maps.places.SearchBox(inputNode, opts)
    setSearchBox(searchBox)
    addSearch(searchBox)
    if (bindingPosition) {
      if (bindingPosition !== lastBindingPosition) {
        const last =
          state.map.controls[google.maps.ControlPosition[lastBindingPosition!]]
        const lastArray = last.getArray()
        last.removeAt(lastArray.findIndex(element => element === container))
        setLastBindingPosition(bindingPosition)
      }
      state.map.controls[google.maps.ControlPosition[bindingPosition]].push(
        inputNode,
      )
    }
    return () => removeSearch()
  }, [state.places, bindingPosition])

  // Register google map event listeners
  useGoogleListener(searchBox, [
    {name: 'places_changed', handler: onPlacesChanged},
  ])

  // Modify the google.maps.places.SearchBox object when component props change
  useEffect(() => {
    if (searchBox === undefined || opts.bounds === undefined) return
    searchBox.setBounds(opts.bounds)
  }, [opts.bounds])

  return bindingPosition ? null : <input id={searchBoxId} {...restProps} />
}

BasicSearchBox.displayName = 'SearchBox'

export default BasicSearchBox
