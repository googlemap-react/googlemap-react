import React from 'react'
import {renderToString} from 'react-dom/server'
import {CustomControl, GoogleMapProvider, MapBox} from '../../..'

describe('CustomControl', () => {
  beforeEach(() => {
    delete (global as any).document
  })

  it('does not render children at server side', async () => {
    expect(
      renderToString(
        <GoogleMapProvider>
          <CustomControl>Hello</CustomControl>
          <MapBox />
        </GoogleMapProvider>,
      ),
    ).not.toMatch('Hello')
  })
})
