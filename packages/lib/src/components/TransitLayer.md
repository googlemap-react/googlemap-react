A wrapper around `google.maps.TransitLayer`.

Use TransitLayer:

```jsx
import {GoogleMapProvider, MapBox, TransitLayer} from '@googlemap-react/core'
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
