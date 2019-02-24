A wrapper around `google.maps.places.SearchBox`.

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
- `onPlacesChanged` is the event handler for the `places_changed` event.
- And you can add any other props that apply to `<input></input>`

A simple SearchBox:

```jsx
const {GoogleMapProvider, MapBox, SearchBox} = require('../../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
    usePlaces
  />
  <SearchBox
    id="search-box"
    placeholder="Search..."
    bindingPosition="TOP_CENTER"
  />
</GoogleMapProvider>
```
