A wrapper around `google.maps.TransitLayer`.

Use TransitLayer:

```jsx
const {GoogleMapProvider, MapBox, TransitLayer} = require('../../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <TransitLayer />
</GoogleMapProvider>
```
