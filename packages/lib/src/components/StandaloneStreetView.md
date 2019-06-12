It is just like `StreetView`, however, iIt will not be bound to the map.

A StandaloneStreetView:

```jsx
import {
  GoogleMapProvider,
  MapBox,
  StandaloneStreetView,
} from '@googlemap-react/core'
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
