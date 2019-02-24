A wrapper around `google.maps.StreetViewPanorama`. The street view will be
automatically bound to the map.

- `opts` specifies the options you want the street view to be created with.
- `style` and `className` will be set for the `div` container of the street
  view.
- The rest are event handlers. For each type of event, there can be an event
  handler.

> **[NOTE]** There can be at most one `StreetView`.
>
> **[NOTE]** Currently, `StreetView` cannot be used when there is no `MapBox`.
> If you do not want the map to be displayed, just set its style properly so
> that it will be hidden. Also, attachments to street view is not allowed.

A simple StreetView:

```jsx
const {GoogleMapProvider, MapBox, StreetView} = require('../../')

;<GoogleMapProvider>
  <div style={{display: 'flex'}}>
    <MapBox
      style={{
        height: '50vh',
        width: '100%',
      }}
      opts={{
        zoom: 14,
        center: {lat: 40.7128, lng: -74.006},
        streetViewControl: true,
      }}
    />
    <StreetView
      style={{
        height: '50vh',
        width: '100%',
      }}
    />
  </div>
</GoogleMapProvider>
```
