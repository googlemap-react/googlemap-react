import React from 'react'
import {renderToString} from 'react-dom/server'
import {GoogleMapProvider, InfoWindow, MapBox} from '../../..'

describe('CustomControl', () => {
  beforeEach(() => {
    delete (global as any).document
  })

  it('does not render children at server side', async () => {
    expect(
      renderToString(
        <GoogleMapProvider>
          <InfoWindow>Hello</InfoWindow>
          <MapBox />
        </GoogleMapProvider>,
      ),
    ).not.toMatch('Hello')
  })
})
