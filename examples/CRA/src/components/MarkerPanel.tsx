import React, {useState} from 'react'
import {CustomControl, HeatMap, Polygon, Polyline} from '../lib'
import InteractiveMarker from './InteractiveMarker'
import {NYC_LATLNG} from '../common/constants'

const MarkerPanel = () => {
  const [num, setNum] = useState(3)
  const initialPositions = Array.from({length: 10}, () => ({
    lat: NYC_LATLNG.lat + Math.random() / 100,
    lng: NYC_LATLNG.lng + Math.random() / 100,
  }))
  const addMarker = () => setNum(num => (num < 10 ? num + 1 : 10))
  const removeMarker = () => setNum(num => (num > 3 ? num - 1 : 3))
  const [positions, setPositions] = useState<google.maps.LatLngLiteral[]>(
    initialPositions,
  )
  return (
    <>
      <CustomControl bindingPosition="LEFT_BOTTOM">
        <h1>Current markers: {num}</h1>
        <button onClick={addMarker} disabled={num >= 10}>
          Add a marker
        </button>
        <button onClick={removeMarker} disabled={num <= 3}>
          Remove a marker
        </button>
      </CustomControl>
      <ul>
        {Array.from({length: num}, (value, index) => index).map(num => (
          <li hidden key={num}>
            <InteractiveMarker
              num={num}
              positions={positions}
              setPositions={setPositions}
            />
          </li>
        ))}
      </ul>
      <Polygon
        opts={{
          paths: positions.slice(0, num),
        }}
      />
      <Polyline
        opts={{
          path: positions.slice(0, num),
          strokeColor: 'blue',
        }}
      />
      <HeatMap
        opts={{
          data: positions.slice(0, num),
          radius: 100,
        }}
      />
    </>
  )
}

MarkerPanel.displayName = 'MarkerPanel'

export default MarkerPanel
