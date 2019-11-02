import React from 'react'
import {act} from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'
import {render, wait} from '@testing-library/react'
import {GoogleMapProvider, InfoWindow, MapBox, Marker} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('InfoWindow', () => {
  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider apiKey="FAKE_KEY">
        <MapBox />
        <InfoWindow visible />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() =>
      rerender(
        <GoogleMapProvider apiKey="FAKE_KEY">
          <MapBox />
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
        <GoogleMapProvider apiKey="FAKE_KEY">
          <MapBox />
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

  it('can have children', async () => {
    const {container} = render(
      <GoogleMapProvider apiKey="FAKE_KEY">
        <MapBox />
        <InfoWindow visible>I am children</InfoWindow>
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
  })
})
