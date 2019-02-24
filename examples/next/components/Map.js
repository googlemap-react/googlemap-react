import {GoogleMapProvider, MapBox} from '@googlemap-react/core'
import DrawingControl from './DrawingControl'

export default () => {
  return (
    <GoogleMapProvider>
      <MapBox 
        style={{
          height: '100vh'
        }}
        useDrawing
      />
      <DrawingControl />
    </GoogleMapProvider>
  )
}
