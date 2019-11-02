import {GoogleMapProvider, MapBox} from '@googlemap-react/core'
import DrawingControl from './DrawingControl'

export default () => {
  return (
    <GoogleMapProvider apiKey="" useDrawing>
      <MapBox 
        style={{
          height: '100vh'
        }}
      />
      <DrawingControl />
    </GoogleMapProvider>
  )
}
