import React from 'react'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import {renderToString} from 'react-dom/server'
import {GoogleMapProvider, MapBox} from '../../..'

describe('MapBox', () => {
  beforeEach(() => {
    delete (global as any).document
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('does not render map at server side', async () => {
    expect(
      renderToString(
        <GoogleMapProvider>
          <MapBox />
        </GoogleMapProvider>,
      ),
    ).not.toMatch('map')
  })
})
