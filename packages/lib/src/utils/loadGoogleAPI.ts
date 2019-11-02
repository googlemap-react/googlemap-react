import loadjs from 'loadjs'
import {
  GOOGLE_MAP_BASE_URI,
  GOOGLE_MAP_LIBRARY_NAMES,
} from '../common/constants'
import {GoogleMapState} from '../common/types'

const loadGoogleAPI = (state: GoogleMapState): Promise<boolean> =>
  new Promise((resolve, reject) => {
    // Should not load script at server side
    if (typeof document === 'undefined')
      reject('This operation should be done on the client side')

    // Construct the library param
    const libraries = {
      drawing: state.useDrawing,
      geometry: state.useGeometry,
      places: state.usePlaces,
      visualization: state.useVisualization,
    }
    let libraryParam = GOOGLE_MAP_LIBRARY_NAMES.filter(
      library => libraries[library],
    ).join(',')

    libraryParam = !libraryParam ? '' : `&libraries=${libraryParam}`
    const languageParam = !state.language ? '' : `&language=${state.language}`
    const regionParam = !state.region ? '' : `&region=${state.region}`

    const googleMapScriptUri = `${GOOGLE_MAP_BASE_URI}?key=${state.apiKey}${libraryParam}${languageParam}${regionParam}`

    if (!loadjs.isDefined('gmap')) loadjs(googleMapScriptUri, 'gmap')
    else resolve(true)

    loadjs.ready('gmap', {
      success: () => {
        resolve(true)
      },
      error: () => {
        loadjs.reset()
        reject('Unable to fetch Google Map sdk')
      },
    })
  })

export default loadGoogleAPI
