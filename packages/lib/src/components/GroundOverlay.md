A wrapper around `google.maps.GroundOverlay`.

- `id` must be unique. If left out, uuid will be used.
- `opts` specifies the options you want the ground overlay to be created with.
- The rest are event handlers. For each type of event, there can be an event
  handler.

A simple GroundOverlay:

```jsx
import {GoogleMapProvider, GroundOverlay, MapBox} from '@googlemap-react/core'
;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <GroundOverlay id="image" />
</GoogleMapProvider>
```
