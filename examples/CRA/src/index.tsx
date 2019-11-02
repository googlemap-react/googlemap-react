import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {GoogleMapProvider} from './lib'
require('dotenv').config()

ReactDOM.render(
  <div>
    <GoogleMapProvider
      apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''}
      useDrawing
      usePlaces
      useVisualization
    >
      <App />
    </GoogleMapProvider>
  </div>,
  document.getElementById('root'),
)
