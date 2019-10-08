import React, {useContext, useEffect, useState} from 'react'
import ReactDOMServer from 'react-dom/server'
import uuid from 'uuid/v1'
import {useGoogleListener, useMemoizedOptions} from '../hooks'
import {DEFAULT_AUTOCOMPLETE_OPTIONS} from '../common/constants'
import {BasicAutocompleteProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

const BasicAutocomplete = ({
  id,
  opts = DEFAULT_AUTOCOMPLETE_OPTIONS,
  onPlaceChanged,
  bindingPosition,
  ...restProps
}: BasicAutocompleteProps) => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [prevOpts, setPrevOpts] = useState('')
  const [autocomplete, setAutocomplete] = useState<
    google.maps.places.Autocomplete | undefined
  >(undefined)
  const [autocompleteId] = useState(id ? id : `autocomplete-${uuid()}`)
  const [container] = useState(
    document
      .createRange()
      .createContextualFragment(
        ReactDOMServer.renderToString(
          <input id={autocompleteId} {...restProps} />,
        ),
      ).firstElementChild,
  )
  const [lastBindingPosition, setLastBindingPosition] = useState(
    bindingPosition,
  )

  const addAutocomplete = (autocomplete: google.maps.places.Autocomplete) =>
    dispatch({type: 'add_object', object: autocomplete, id: autocompleteId})
  const removeAutocomplete = () =>
    dispatch({type: 'remove_object', id: autocompleteId})

  // Create google.maps.places.Autocomplete
  useEffect(() => {
    if (state.map === undefined || state.places === undefined) return
    const inputNode = (bindingPosition
      ? container
      : document.getElementById(autocompleteId)) as HTMLInputElement
    const autocomplete = new google.maps.places.Autocomplete(inputNode, opts)
    setAutocomplete(autocomplete)
    addAutocomplete(autocomplete)
    setPrevOpts(JSON.stringify(opts))
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
    return () => removeAutocomplete()
  }, [state.places, bindingPosition])

  // Register google map event listeners
  useGoogleListener(autocomplete, [
    {name: 'place_changed', handler: onPlaceChanged},
  ])

  // Modify the google.maps.Autocomplete object when component props change
  useMemoizedOptions(autocomplete, opts, prevOpts, setPrevOpts)

  return bindingPosition ? null : <input id={autocompleteId} {...restProps} />
}

BasicAutocomplete.displayName = 'Autocomplete'

export default BasicAutocomplete
