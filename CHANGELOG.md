# CHANGELOG

## [0.1.5] - <2019-07-24>

### FIXED

- (#14) Update bindingPosition of `CustomControl`/`SearchBox` on prop change.

## [0.1.4] - <2019-06-20>

### FIXED

- Prevent `opts` of `<MapBox>` from being modified by `new google.maps.Map()`.

## [0.1.3] - <2019-03-16>

### FIXED

- Remove unused `state.searches`

## [0.1.2] - <2019-03-08>

### FIXED

- Remove console information

## [0.1.1] - <2019-03-08>

### FIXED

- Use memoized options for the following (#4):
  - `MapBox`
  - `Marker`
  - `Circle`
  - `Polyline`
  - `Polygon`
  - `Rectangle`
  - `StreetView`
  - `KmlLayer`
  - `DrawingManager`
- Re-register event listeners on rerender (#3)

## [0.1.0] - <2019-03-06>

### CHANGED

- `InfoWindow` can have `children` now, which has higher priority than
  `opts.content`.

## [0.0.5] - <2019-02-27>

### FIXED

- Improved SSR support.

## [0.0.4] - <2019-02-24>

### CHANGED

- Do not load script at server side.

## [0.0.3] - <2019-02-24>

### FIXED

- Objects can be removed properly.

## [0.0.2] - <2019-02-24>

## [0.0.1] - <2019-02-24>

### CHANGED

- `@lucifer1004/react-google-map` has been renamed to `@googlemap-react/core`.
