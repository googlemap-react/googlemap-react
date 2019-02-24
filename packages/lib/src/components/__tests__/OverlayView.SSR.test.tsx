import React from 'react'
import {renderToString} from 'react-dom/server'
import {GoogleMapProvider, MapBox, OverlayView} from '../../..'

describe('OverlayView', () => {
  beforeEach(() => {
    delete (global as any).document
  })

  it('does not render children at server side', async () => {
    expect(
      renderToString(
        <GoogleMapProvider>
          <OverlayView>Overlay</OverlayView>
          <MapBox />
        </GoogleMapProvider>,
      ),
    ).not.toMatch('Overlay')
  })
})
