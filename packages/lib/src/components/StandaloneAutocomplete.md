It is just like `Autocomplete`, however, no `bindingPosition` is needed. It will
not be placed on the map.

A simple StandaloneAutocomplete:

```jsx
import {
  GoogleMapProvider,
  MapBox,
  StandaloneAutocomplete,
} from '@googlemap-react/core'
;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
    usePlaces
  />
  <StandaloneAutocomplete
    id="standalone-autocomplete"
    placeholder="Search..."
  />
</GoogleMapProvider>
```
