import {useEffect} from 'react'

interface GoogleMapEvent {
  name: string
  handler?: Function
}

const useGoogleListener = (
  instance: google.maps.MVCObject | undefined,
  events: GoogleMapEvent[],
) => {
  useEffect(() => {
    if (instance === undefined) return
    const listeners: google.maps.MapsEventListener[] = []
    events.forEach(event => {
      if (event.handler)
        listeners.push(
          google.maps.event.addListener(instance, event.name, event.handler),
        )
    })
    return () => {
      listeners.forEach(listener => listener.remove())
    }
  }, [instance])
}

export default useGoogleListener
