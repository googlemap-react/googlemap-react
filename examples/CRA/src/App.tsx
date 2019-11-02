import React from 'react'
import {Autocomplete, MapBox, OverlayView, TrafficLayer, SearchBox} from './lib'
import CenterButton from './components/CenterButton'
import DrawingControl from './components/DrawingControl'
import MarkerPanel from './components/MarkerPanel'
import StreetViewControl from './components/StreetViewControl'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <DrawingControl />
      <MarkerPanel />
      <OverlayView disableMapHitsAndGestures>
        <h2>
          This is an OverlayView
          <span
            role="img"
            title="emoji: hands up"
            aria-label="jsx-a11y/accessible-emoji"
          >
            🙌
          </span>
        </h2>
      </OverlayView>
      <div className="Map">
        <Autocomplete
          id="autocomplete"
          placeholder="Autocomplete..."
          bindingPosition="TOP_CENTER"
          opts={{
            bounds: {
              east: -73.98,
              west: -73.985,
              north: 40.706,
              south: 40.702,
            },
            fields: ['address_components'],
          }}
        />
        <SearchBox
          id="search-box"
          placeholder="Search..."
          bindingPosition="BOTTOM_CENTER"
        />
        <MapBox
          opts={{
            center: {
              lat: 40.7128,
              lng: -74.006,
            },
            disableDefaultUI: true,
            streetViewControl: true,
            zoom: 14,
          }}
        />
        <CenterButton />
        <StreetViewControl />
        <TrafficLayer />
      </div>
    </div>
  )
}

App.displayName = 'App'

export default App
