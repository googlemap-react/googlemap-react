import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {NYC_LATLNG} from '../common/constants'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {OverlayViewProps} from '../common/types'

const OverlayView = ({
  pane = 'overlayMouseTarget',
  position = NYC_LATLNG,
  children,
  onClick,
  onDoubleClick,
  onMouseDown,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onTouchEnd,
  onTouchStart,
  disableMapHits = false,
  disableMapHitsAndGestures = false,
}: OverlayViewProps): React.ReactPortal | null => {
  if (!document) return null

  const {state} = useContext(GoogleMapContext)
  const [container] = useState<HTMLDivElement>(document.createElement('div'))
  const [_overlay, setOverlay] = useState<google.maps.OverlayView | undefined>(
    undefined,
  )

  useEffect(() => {
    if (state.map === undefined) return
    const overlay = new google.maps.OverlayView()
    overlay.onAdd = () => {
      container.style.position = 'absolute'
      container.onclick = onClick || null
      container.ondblclick = onDoubleClick || null
      container.onmousedown = onMouseDown || null
      container.onmouseover = onMouseOver || null
      container.onmouseout = onMouseOut || null
      container.onmouseup = onMouseUp || null
      container.ontouchend = onTouchEnd || null
      container.ontouchstart = onTouchStart || null

      // @types/googlemap does not define `preventMapHitsFrom` or `preventMapHitsAndGesturesFrom`
      if (disableMapHitsAndGestures)
        (google.maps.OverlayView as any).preventMapHitsAndGesturesFrom(
          container,
        )
      else if (disableMapHits)
        (google.maps.OverlayView as any).preventMapHitsFrom(container)

        // Use an ugly cast to avoid package bundle issue
      ;(overlay.getPanes() as any)[pane].appendChild(container)
    }
    overlay.draw = () => {
      const location = overlay
        .getProjection()
        .fromLatLngToDivPixel(
          new google.maps.LatLng(position.lat, position.lng),
        )
      container.style.left = JSON.stringify(location.x) + 'px'
      container.style.top = JSON.stringify(location.y) + 'px'
    }
    overlay.onRemove = () => {
      container.parentNode && container.parentNode.removeChild(container)
    }
    overlay.setMap(state.map)
    setOverlay(overlay)
    return () => overlay.setMap(null)
  }, [state.map])

  return ReactDOM.createPortal(children, container)
}

OverlayView.displayName = 'OverlayView'

export default OverlayView
