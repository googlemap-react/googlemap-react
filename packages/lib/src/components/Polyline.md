A wrapper around `google.maps.Polyline`.

- `id` must be unique. If left out, uuid will be used.
- `opts` specifies the options you want the polyline to be created with.
- The rest are event handlers. For each type of event, there can be an event
  handler.

A simple Polyline:

```jsx
import {GoogleMapProvider, MapBox, Polyline} from '@googlemap-react/core'
;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <Polyline id="polyline" />
</GoogleMapProvider>
```
