Use this component to add custom controls to the map.

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
- `children` is the `ReactNode` to be put on the map.

A simple CustomControl:

```jsx
import {
  CustomControl,
  GoogleMapContext,
  GoogleMapProvider,
  MapBox,
} from '@googlemap-react/core'
;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <CustomControl>
    <button
      style={{
        color: 'red',
      }}
    >
      CustomControl
    </button>
  </CustomControl>
</GoogleMapProvider>
```
