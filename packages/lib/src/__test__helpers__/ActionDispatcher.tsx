import React, {useContext, useEffect} from 'react'
import {GoogleMapAction} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

export default ({action}: {action: GoogleMapAction}) => {
  const {dispatch} = useContext(GoogleMapContext)
  useEffect(() => {
    dispatch(action)
  }, [])
  return <div>This is a fake component</div>
}
