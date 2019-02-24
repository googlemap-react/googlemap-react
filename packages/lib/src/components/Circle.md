A wrapper around `google.maps.Circle`.

- `id` must be unique. If left out, uuid will be used.
- `opts` specifies the options you want the circle to be created with.
- The rest are event handlers. For each type of event, there can be an event
  handler.

A simple Circle:

```jsx
const {Circle, GoogleMapProvider, MapBox} = require('../../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <Circle id="circle" />
</GoogleMapProvider>
```
