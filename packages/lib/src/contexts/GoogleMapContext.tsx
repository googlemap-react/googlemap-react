import React, {useReducer} from 'react'
import {
  GoogleMapAction,
  GoogleMapObject,
  GoogleMapObjectWithSetMap,
  GoogleMapProviderProps,
  GoogleMapReducer,
  GoogleMapState,
} from '../common/types'

const initialState = (): GoogleMapState => ({
  map: undefined,
  objects: new Map<string, GoogleMapObject>(),
  places: undefined,
  searches: new Map<string, google.maps.places.SearchBox>(),
})

const GoogleMapContext = React.createContext<GoogleMapReducer>({
  state: (undefined as unknown) as GoogleMapState,
  dispatch: (undefined as unknown) as React.Dispatch<GoogleMapAction>,
})

const reducer = (state: GoogleMapState, action: GoogleMapAction) => {
  switch (action.type) {
    case 'reset':
      return initialState()

    case 'init_map':
      if (action.map === undefined)
        throw new Error('You should specify a map instance')
      if (state.map !== undefined)
        throw new Error('There can only be one map instance in a context')

      return {...state, map: action.map, places: action.places}

    case 'add_object':
      if (action.object === undefined)
        throw new Error('You should specify an object instance')
      if (action.id === undefined) throw new Error('You should specify an id')
      if (state.objects.has(action.id))
        throw new Error('The id has already been taken')
      state.objects.set(action.id, action.object)

      return state

    case 'remove_object':
      if (action.id === undefined) throw new Error('You should specify an id')
      const objectToRemove = state.objects.get(action.id)
      if (objectToRemove === undefined)
        throw new Error('There is no object with the given id')

      // If the object can setMap, then setMap to null
      if ((objectToRemove as GoogleMapObjectWithSetMap).setMap)
        (objectToRemove as GoogleMapObjectWithSetMap).setMap(null)
      state.objects.delete(action.id)

      return state

    default:
      return state
  }
}

const GoogleMapProvider = ({children}: GoogleMapProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState())
  const value = {state, dispatch}

  return (
    <>
      <GoogleMapContext.Provider value={value}>
        {children}
      </GoogleMapContext.Provider>
    </>
  )
}

const GoogleMapConsumer = GoogleMapContext.Consumer

export {GoogleMapContext, GoogleMapProvider, GoogleMapConsumer}
