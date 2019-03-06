A wrapper around `google.maps.InfoWindow`.

- `anchorId` is the `id` of the object (normally it will be a marker) you want
  the info window to anchor at. This will work only when the target object has
  the `position` property.
- `opts` specifies the options you want the info window to be created with.
- `visible` determines whether the info window is visible.
- The rest are event handlers. For each type of event, there can be an event
  handler.
- **Note:** If an `InfoWindow` has `children`, `opts.content` will be ignored,
  instead, the `children` will be displayed.

A simple InfoWindow (without anchor):

```jsx
const {GoogleMapProvider, MapBox, InfoWindow} = require('../../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <InfoWindow visible />
</GoogleMapProvider>
```

An InfoWindow anchored at a Marker:

```jsx
const {GoogleMapProvider, MapBox, Marker, InfoWindow} = require('../../')

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
      draggable: true,
      position: {
        lat: 40.7128,
        lng: -74.006,
      },
    }}
  />
  <InfoWindow
    anchorId="marker"
    opts={{
      content: 'I am anchored',
    }}
    visible
  />
</GoogleMapProvider>
```

InfoWindow with children:

```jsx
const {GoogleMapProvider, MapBox, InfoWindow} = require('../../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <InfoWindow visible>
    <button
      onClick={() => {
        alert('Hello')
      }}
    >
      Click me!
    </button>
  </InfoWindow>
</GoogleMapProvider>
```
