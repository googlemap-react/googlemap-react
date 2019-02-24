import React, {useContext} from 'react'
import {CustomControl, GoogleMapContext} from '../lib'

const CenterButton = () => {
  const {state} = useContext(GoogleMapContext)
  return (
    <CustomControl>
      <button
        onClick={() => {
          state.map &&
            state.map.setCenter({
              lat: 40.7128,
              lng: -74.006,
            })
        }}
      >
        Center
      </button>
    </CustomControl>
  )
}

CenterButton.displayName = 'CenterButton'

export default CenterButton
