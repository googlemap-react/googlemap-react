A wrapper around `google.maps.Polygon`.

- `id` must be unique. If left out, uuid will be used.
- `opts` specifies the options you want the polygon to be created with.
- The rest are event handlers. For each type of event, there can be an event
  handler.

A simple Polygon:

```jsx
import {GoogleMapProvider, MapBox, Polygon} from '@googlemap-react/core'
;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <Polygon id="polygon" />
</GoogleMapProvider>
```
