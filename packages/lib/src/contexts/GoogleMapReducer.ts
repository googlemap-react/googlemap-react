import {
  GoogleMapAction,
  GoogleMapObjectWithSetMap,
  GoogleMapState,
} from '../common/types'
import initialState from './GoogleMapStateInitializer'

export default (
  state: GoogleMapState,
  action: GoogleMapAction,
): GoogleMapState => {
  switch (action.type) {
    case 'reset':
      return initialState()

    case 'load_api':
      return {...state, shouldLoadAPI: true}

    case 'api_loaded':
      return {...state, apiLoaded: true}

    case 'init_map':
      if (action.map === undefined)
        console.error('You should specify a map instance')
      if (state.map !== undefined)
        console.error('There can only be one map instance in a context')
      return {...state, map: action.map, places: action.places}

    case 'add_object':
      if (action.object === undefined) {
        console.error('You should specify an object instance')
        return state
      }
      if (action.id === undefined) {
        console.error('You should specify an id')
        return state
      }
      if (state.objects.has(action.id!)) {
        console.error('The id has already been taken')
        return state
      }
      state.objects.set(action.id!, action.object!)

      return state

    case 'remove_object':
      if (action.id === undefined) {
        console.error('You should specify an id')
        return state
      }

      const objectToRemove = state.objects.get(action.id!)
      if (objectToRemove === undefined) {
        console.error('There is no object with the given id')
        return state
      }

      // If the object can setMap, then setMap to null
      if ((objectToRemove as GoogleMapObjectWithSetMap).setMap)
        (objectToRemove as GoogleMapObjectWithSetMap).setMap(null)
      state.objects.delete(action.id!)

      return state

    default:
      return state
  }
}
