import {GoogleMapObject, GoogleMapState} from '../common/types'

export default (
  apiKey?: string,
  language?: string,
  region?: string,
  useDrawing?: boolean,
  useGeometry?: boolean,
  usePlaces?: boolean,
  useVisualization?: boolean,
): GoogleMapState => ({
  apiKey: apiKey || '',
  language: language || '',
  region: region || '',
  useDrawing: useDrawing || false,
  useGeometry: useGeometry || false,
  usePlaces: usePlaces || false,
  useVisualization: useVisualization || false,
  apiLoaded: false,
  shouldLoadAPI: false,
  map: undefined,
  objects: new Map<string, GoogleMapObject>(),
  places: undefined,
})
