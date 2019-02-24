import {useState, useEffect} from 'react'
import loadjs from 'loadjs'
import {GOOGLE_MAP_BASE_URI} from '../common/constants'

interface GoogleAPIProps {
  apiKey: string
  libraryParam: string
  languageParam: string
  regionParam: string
}

const useGoogleAPI = ({
  apiKey,
  libraryParam,
  languageParam,
  regionParam,
}: GoogleAPIProps) => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    // Should not load script at server side
    if (typeof document === 'undefined') return

    const googleMapScriptUri = `${GOOGLE_MAP_BASE_URI}?key=${apiKey}${libraryParam}${languageParam}${regionParam}`
    if (!loadjs.isDefined('gmap')) loadjs(googleMapScriptUri, 'gmap')
    loadjs.ready('gmap', {
      success: () => {
        setLoaded(true)
      },
      error: () => {
        loadjs.reset()
        console.error('Unable to fetch Google Map sdk')
      },
    })
  }, [])
  return loaded
}

export default useGoogleAPI
