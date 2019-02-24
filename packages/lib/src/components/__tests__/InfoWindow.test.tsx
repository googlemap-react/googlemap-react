import React from 'react'
import {act} from 'react-dom/test-utils'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import {render, wait, cleanup} from 'react-testing-library'
import {GoogleMapProvider, InfoWindow, MapBox, Marker} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('InfoWindow', () => {
  afterEach(() => {
    cleanup()
  })

  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <InfoWindow visible />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <Marker id="marker" />
          <InfoWindow
            opts={{
              position: {lat: 39, lng: 116},
              zIndex: 10,
            }}
            anchorId="marker"
            visible
          />
        </GoogleMapProvider>,
      ),
    )
    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <Marker id="marker" />
          <InfoWindow
            opts={{
              content: 'This is an info window',
              position: {lat: 38, lng: 116},
            }}
            anchorId="marker"
            visible={false}
          />
        </GoogleMapProvider>,
      ),
    )
  })
})
