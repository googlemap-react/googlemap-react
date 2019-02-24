import React, {useContext, useEffect, useState} from 'react'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

export default () => {
  const {state} = useContext(GoogleMapContext)
  const [text, setText] = useState('')
  useEffect(() => {
    if (state.map === undefined) return
    setTimeout(() => {
      const marker = new google.maps.Marker({
        map: state.map,
        position: {lat: 39, lng: 116},
      })
      google.maps.event.trigger(
        state.objects.get('drawing-manager'),
        'overlaycomplete',
        {
          overlay: marker,
          type: 'marker',
        },
      )
      setText('event emitted')
    }, 1000)
  }, [state.map])
  return <p>{text}</p>
}
