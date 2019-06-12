import React from 'react'
import {act} from 'react-dom/test-utils'
import 'jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import {render, wait, cleanup} from '@testing-library/react'
import {GoogleMapProvider, MapBox, Marker} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('Marker', () => {
  afterEach(() => {
    cleanup()
  })

  it('can be rendered', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
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
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <Marker opts={{position: {lat: 39, lng: 116}}} />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <Marker
            id="my-marker"
            opts={{
              animation: google.maps.Animation.BOUNCE,
              icon: '',
              label: 'test',
              place: {},
              position: {lat: 39, lng: 116},
              title: 'test',
              zIndex: 10,
            }}
          />
        </GoogleMapProvider>,
      ),
    )
  })

  it('of same id cannot be added twice', async () => {
    const check = async () => {
      const {container} = render(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <Marker id="marker" />
          <Marker id="marker" />
        </GoogleMapProvider>,
      )
      await wait(() => {
        expect(container.innerHTML).not.toMatch('Loading...')
      })
    }

    expect(check()).rejects.toEqual(new Error('The id has already been taken'))
  })
})
