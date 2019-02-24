import React, {useState} from 'react'
import {InfoWindow, Marker} from '../lib'

interface InteractiveMarkerProps {
  num: number
  positions: google.maps.LatLngLiteral[]
  setPositions: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral[]>
  >
}

const InteractiveMarker = ({
  num,
  positions,
  setPositions,
}: InteractiveMarkerProps) => {
  const [infoDisplay, setInfoDisplay] = useState(false)
  const changeInfoDisplay = () => setInfoDisplay(display => !display)
  return (
    <>
      <Marker
        id={`marker-${num}`}
        opts={{
          draggable: true,
          label: num.toString(),
          position: positions[num],
        }}
        onClick={changeInfoDisplay}
        onDragEnd={event => {
          setPositions(positions => {
            positions[num] = event.latLng.toJSON()
            return positions.slice()
          })
        }}
      />
      <InfoWindow
        anchorId={`marker-${num}`}
        opts={{
          content: `marker-${num}
            lat: ${positions[num].lat.toFixed(4)} 
            lng: ${positions[num].lng.toFixed(4)}
          `,
        }}
        visible={infoDisplay}
        onCloseClick={() => setInfoDisplay(false)}
      />
    </>
  )
}

InteractiveMarker.displayName = 'InteractiveMarker'

export default InteractiveMarker
