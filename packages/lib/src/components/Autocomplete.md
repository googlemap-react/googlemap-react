A wrapper around `google.maps.places.Autocomplete`.

- `usePlaces` must be `true` in `MapBox`
- `id` must be unique. If left out, uuid will be used.
- `opts` specifies the options you want the rectangle to be created with.
- `bindingPosition` specifies the position you want the search box to be placed
  at. Possible options are:
  - 'BOTTOM_CENTER'
  - 'BOTTOM_LEFT'
  - 'BOTTOM_RIGHT'
  - 'LEFT_BOTTOM'
  - 'LEFT_CENTER'
  - 'LEFT_TOP'
  - 'RIGHT_BOTTOM'
  - 'RIGHT_CENTER'
  - 'RIGHT_TOP'
  - 'TOP_CENTER'
  - 'TOP_LEFT'
  - 'TOP_RIGHT'
- `onPlaceChanged` is the event handler for the `place_changed` event.
- And you can add any other props that apply to `<input></input>`

A simple Autocomplete:

```jsx
import {GoogleMapProvider, MapBox, Autocomplete} from '@googlemap-react/core'
;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
    usePlaces
  />
  <Autocomplete
    id="autocomplete"
    placeholder="Search..."
    bindingPosition="TOP_CENTER"
  />
</GoogleMapProvider>
```
