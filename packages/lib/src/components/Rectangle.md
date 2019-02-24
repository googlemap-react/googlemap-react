A wrapper around `google.maps.Rectangle`.

- `id` must be unique. If left out, uuid will be used.
- `opts` specifies the options you want the rectangle to be created with.
- The rest are event handlers. For each type of event, there can be an event
  handler.

A simple Rectangle:

```jsx
const {GoogleMapProvider, MapBox, Rectangle} = require('../../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <Rectangle id="rectangle" />
</GoogleMapProvider>
```
