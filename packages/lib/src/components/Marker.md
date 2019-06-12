A wrapper around `google.maps.Marker`.

- `id` must be unique. If left out, uuid will be used.
- `opts` specifies the options you want the marker to be created with.
- The rest are event handlers. For each type of event, there can be an event
  handler.

A simple Marker:

```jsx
import {GoogleMapProvider, MapBox, Marker} from '@googlemap-react/core'
;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <Marker
    id="marker"
    opts={{
      position: {
        lat: 40.7128,
        lng: -74.006,
      },
    }}
  />
</GoogleMapProvider>
```
