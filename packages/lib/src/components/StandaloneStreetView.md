It is just like `StreetView`, however, iIt will not be bound to the map.

A StandaloneStreetView:

```jsx
const {GoogleMapProvider, MapBox, StandaloneStreetView} = require('../../')

;<GoogleMapProvider>
  <MapBox />
  <StandaloneStreetView
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
</GoogleMapProvider>
```
