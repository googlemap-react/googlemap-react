# React Google Map

[![version](https://img.shields.io/badge/%40lucifer1004%2Freact--google--map-3.0.0-blue.svg)](https://www.npmjs.com/package/@lucifer1004/react-google-map)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![codecov](https://codecov.io/gh/lucifer1004/react-google-map/branch/master/graph/badge.svg)](https://codecov.io/gh/lucifer1004/react-google-map)
[![codebeat badge](https://codebeat.co/badges/e7a5b064-277b-496d-9528-6fb835eb6ad4)](https://codebeat.co/projects/github-com-lucifer1004-react-google-map-master)

Easier Google Map Integration for React projects.

[READ THE DOC](https://react-google-map.gabriel-wu.com)

## Why a new package

There has been similar packages such as
[tomchentw/react-google-maps](https://github.com/tomchentw/react-google-maps),
[google-map-react/google-map-react](https://github.com/google-map-react/google-map-react),
[fullstackreact/google-maps-react](https://github.com/fullstackreact/google-maps-react),
so why bother writing a new library?

The aim is to make an easier-to-use Google Map library for React users,
empowered by `React`'s latest features (`React >= 16.8.0` is required) and
`TypeScript`.

## What is different

- Component position is free (generally)
- Direct access to Google Map objects
- More uniform API
- Type safe

## Example usage

### Prerequisites

- npm or yarn

```sh
yarn add @lucifer1004/react-google-map
# Or you can use
npm install --save @lucifer1004/react-google-map
```

- a valid Google Map API key (to replace the place holder in the code snippet
  below)

```javascript
import {
  GoogleMapProvider,
  HeatMap,
  InfoWindow,
  MapBox,
  Marker,
  Polygon,
} from '@lucifer1004/react-google-map'

// In your component
return (
  <GoogleMapProvider>
    <MapBox
      apiKey="YOUR_GOOGLE_MAP_API_KEY"
      opts={{
        center: {lat: 39, lng: 116},
        zoom: 14,
      }}
      useDrawing
      useGeometry
      usePlaces
      useVisualization
      onCenterChanged={() => {
        console.log('The center of the map has changed.')
      }}
    />
    <Marker
      id="marker"
      opts={{
        draggable: true,
        label: 'hello',
        position: {lat: 39, lng: 116},
      }}
    />
    <InfoWindow
      opts={{
        content: 'This is an info window',
        position: {lat: 39.01, lng: 115.99},
      }}
      visible
    />
    <Polygon
      id="polygon"
      opts={{
        path: [
          {lat: 38.98, lng: 116.01},
          {lat: 38.98, lng: 116.03},
          {lat: 38.99, lng: 116.03},
        ],
        strokeColor: 'cyan',
      }}
    />
    <HeatMap
      opts={{
        data: [
          {lat: 38.982, lng: 116.037},
          {lat: 38.982, lng: 116.035},
          {lat: 38.985, lng: 116.047},
          {lat: 38.985, lng: 116.045},
        ],
      }}
    />
    <OverlayView position={{lat: 39, lng: 116}}>
      <h2>⚑ This is a custom overlay 🙌</h2>
    </OverlayView>
  </GoogleMapProvider>
)
```

For more detailed explanation, see the
[doc](https://react-google-map.garbiel-wu.com).

## Advanced usage

Instead of using the pre-designed components, you can also use the exported
hooks `useGoogleAPI`, `useGoogleListeners` in your own components.

## See the examples

First, you need to clone the repository and install the dependencies:

```sh
git clone https://github.com/lucifer1004/react-gmap
cd react-gmap
yarn install
```

### Styleguide

To read the styleguide locally, simply run:

```sh
yarn styleguide
```

And you can then go to http://localhost:6060 to see the styleguide.

### CRA (Create-React-App) example

You can also run the example app. Before running it locally, you should copy the
sample dotenv file, and fill in your Google Map API key to replace the
placeholder.

```sh
cd examples/CRA
cp .env.sample .env
```

Then you can run the example project by

```sh
yarn start
```

## Projects using this package

### Boycott [github](https://github.com/lucifer1004/boycott)|[site](https://boycott.gabriel-wu.com)

This app combines Google Map API and Yelp API, helping users search nearby
businesses.

![Screenshot](./images/boycott.png)
