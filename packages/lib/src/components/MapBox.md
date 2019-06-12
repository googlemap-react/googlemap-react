A wrapper around `google.map.Map`.

- `apiKey` should be your own Google Map API key.
- `opts` specifies the options you want the map to be created with.
- `style` and `className` will be set for the `div` container of the map.
- `language` and `region` are used to specify a language or a region when
  requesting Google Map scripts.
- `useDrawing`/`useGeometry`/`usePlaces`/`useVisualization` are used to request
  extra libraries.
- `LoadingComponent` will be shown in the container when Google Map scripts are
  being loaded. Default is `<p>Loading...</p>`.
- `LoadedComponent` will be shown in the container when Google Map scripts are
  ready. Default is `null`.
- The rest are event handlers. For each type of event, there can be an event
  handler.

Here is a simple example:

```jsx
import {GoogleMapProvider, MapBox} from '@googlemap-react/core'
;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
</GoogleMapProvider>
```
