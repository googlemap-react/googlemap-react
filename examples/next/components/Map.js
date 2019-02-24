import {GoogleMapProvider, MapBox, Marker} from '@googlemap-react/core'

const Map = () => (
  <GoogleMapProvider>
    <MapBox style={{
      height: '100vh'
    }}/>
    <Marker />
  </GoogleMapProvider>
)

export default Map