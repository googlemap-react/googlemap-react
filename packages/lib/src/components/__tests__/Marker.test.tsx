import React from 'react'
import {act} from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'
import {render, wait, cleanup} from '@testing-library/react'
import {GoogleMapProvider, MapBox, Marker} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('Marker', () => {
  it('can be rendered', async () => {
    const {container} = render(
      <GoogleMapProvider apiKey="FAKE_KEY">
        <MapBox />
        <Marker />
      </GoogleMapProvider>,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
  })

  it('updates options after rerender', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider apiKey="FAKE_KEY">
        <MapBox />
        <Marker opts={{position: {lat: 39, lng: 116}}} />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() =>
      rerender(
        <GoogleMapProvider apiKey="FAKE_KEY">
          <MapBox />
          <Marker
            opts={{
              animation: google.maps.Animation.BOUNCE,
              icon: '',
              label: 'test',
              position: {lat: 39, lng: 116},
              title: 'test',
              zIndex: 10,
            }}
          />
        </GoogleMapProvider>,
      ),
    )
  })
})
