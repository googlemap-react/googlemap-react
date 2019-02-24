A wrapper around `google.maps.BicyclingLayer`.

Use BicyclingLayer:

```jsx
const {BicyclingLayer, GoogleMapProvider, MapBox} = require('../../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <BicyclingLayer />
</GoogleMapProvider>
```
