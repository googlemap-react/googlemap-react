# CHANGELOG

## [0.1.11] - <2019-12-28>

### FIXED

- (#1) Handle SSR of `MapBox` and `CustomControl`

## [0.1.10] - <2019-12-20>

### CHANGED

- Use `ref` instead of relying on `uuid` in `MapBox`

## [0.1.9] - <2019-11-20>

### FIXED

- Remove yet another `console.log` in OverlayView.

## [0.1.8] - <2019-11-20>

### FIXED

- Remove `console.log` in OverlayView.

## [0.1.7] - <2019-11-20>

### FIXED

- (#32) OverlayView now responds to position change.

## [0.1.6] - <2019-10-09>

### ADDED

- (#22) Add AutoComplete.

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
