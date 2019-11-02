import React, {useReducer, useEffect} from 'react'
import {
  GoogleMapAction,
  GoogleMapProviderProps,
  GoogleMapReducer,
  GoogleMapState,
} from '../common/types'
import reducer from './GoogleMapReducer'
import initialState from './GoogleMapStateInitializer'
import loadGoogleAPI from '../utils/loadGoogleAPI'

const GoogleMapContext = React.createContext<GoogleMapReducer>({
  state: (undefined as unknown) as GoogleMapState,
  dispatch: (undefined as unknown) as React.Dispatch<GoogleMapAction>,
})

const GoogleMapProvider = ({
  apiKey,
  language,
  region,
  useDrawing,
  useGeometry,
  usePlaces,
  useVisualization,
  children,
}: GoogleMapProviderProps) => {
  const initial = initialState(
    apiKey,
    language,
    region,
    useDrawing,
    useGeometry,
    usePlaces,
    useVisualization,
  )
  const [state, dispatch] = useReducer(reducer, initial)

  useEffect(() => {
    const load = async function() {
      try {
        const loaded = await loadGoogleAPI(initial)
        if (loaded) dispatch({type: 'api_loaded'})
      } catch (err) {
        console.error(err)
      }
    }
    if (state.shouldLoadAPI && !state.apiLoaded) {
      load()
    }
  }, [state.shouldLoadAPI, state.apiLoaded])

  return (
    <>
      <GoogleMapContext.Provider value={{state, dispatch}}>
        {children}
      </GoogleMapContext.Provider>
    </>
  )
}

const GoogleMapConsumer = GoogleMapContext.Consumer

export {GoogleMapContext, GoogleMapProvider, GoogleMapConsumer}
