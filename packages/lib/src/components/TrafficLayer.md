A wrapper aroound `google.maps.TrafficLayer`.

Use TrafficLayer:

```jsx
const {GoogleMapProvider, MapBox, TrafficLayer} = require('../../')

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
