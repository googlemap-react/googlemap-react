A wrapper around `google.maps.drawing.DrawingManager`.

- `useDrawing` must be `true` in `MapBox`
- `opts` specifies the options you want the heat map to be created with.
- The rest are event handlers. For each type of event, there can be an event
  handler.

> **[NOTE]** Map overlays drawn via the drawing manager will have ids starting
> from `drawing-manager-0`. They will be removed from the map when
> `DrawingManager` is unmounted. So if you want to keep them, you should not
> unmount `DrawingManager`, instead, you can set the `drawingControl` property
> of `opts` to `false` to hide the drawing control panel.

A simple DrawingManager:

```jsx
import {DrawingManager, GoogleMapProvider, MapBox} from '@googlemap-react/core'
;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
    useDrawing
  />
  <DrawingManager />
</GoogleMapProvider>
```
