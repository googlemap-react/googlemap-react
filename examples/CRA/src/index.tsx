import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {GoogleMapProvider} from './lib'
console.log(GoogleMapProvider)
require('dotenv').config()

ReactDOM.render(
  <GoogleMapProvider>
    <App />
  </GoogleMapProvider>,
  document.getElementById('root'),
)
