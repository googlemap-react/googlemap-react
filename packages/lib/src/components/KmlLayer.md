A wrapper around `google.maps.KmlLayer`.

- `id` must be unique. If left out, uuid will be used.
- `opts` specifies the options you want the kml layer to be created with.
- The rest are event handlers. For each type of event, there can be an event
  handler.

A simple KmlLayer
([data source](http://api.flickr.com/services/feeds/geo/?g=322338@N20&lang=en-us&format=feed-georss)):

```jsx
const {GoogleMapProvider, KmlLayer, MapBox} = require('../../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <KmlLayer id="kml" />
</GoogleMapProvider>
```
