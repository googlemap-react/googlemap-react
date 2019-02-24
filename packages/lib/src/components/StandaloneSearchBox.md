It is just like `SearchBox`, however, no `bindingPosition` is needed. It will
not be placed on the map.

A simple StandaloneSearchBox:

```jsx
const {GoogleMapProvider, MapBox, StandaloneSearchBox} = require('../../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
    usePlaces
  />
  <StandaloneSearchBox id="standalone-search-box" placeholder="Search..." />
</GoogleMapProvider>
```
