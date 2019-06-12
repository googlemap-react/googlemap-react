A wrapper around `google.maps.OverlayView`.

- `pane` is the map pane in which the overlay view will be rendered, options
  are:
  - 'floatPane'
  - 'mapPane'
  - 'markerLayer'
  - 'overlayLayer'
  - 'overlayMouseTarget'
- `position` is `google.maps.LatLngLiteral`.
- `children` is the `ReactNode` to be put on the map.
- If `disableMapHits` is `true`, the overlay view will disable map hit events
  over it. If `disableMapHitsAndGestures` is `true`, gestures will also be
  disabled. `disableMapHitsAndGestures` has higher priority.
- The rest are event handlers. For each type of event, there can be an event
  handler.

A simple OverlayView:

```jsx
import {GoogleMapProvider, MapBox, OverlayView} from '@googlemap-react/core'
;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <OverlayView>
    <h1 style={{fontSize: '40px'}}>This is an overlay🌈</h1>
  </OverlayView>
</GoogleMapProvider>
```
