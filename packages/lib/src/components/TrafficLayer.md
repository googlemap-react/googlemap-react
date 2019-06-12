A wrapper aroound `google.maps.TrafficLayer`.

Use TrafficLayer:

```jsx
import {GoogleMapProvider, MapBox, TrafficLayer} from '@googlemap-react/core'
;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <TrafficLayer />
</GoogleMapProvider>
```
