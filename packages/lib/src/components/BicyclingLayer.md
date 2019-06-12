A wrapper around `google.maps.BicyclingLayer`.

Use BicyclingLayer:

```jsx
import {BicyclingLayer, GoogleMapProvider, MapBox} from '@googlemap-react/core'
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
