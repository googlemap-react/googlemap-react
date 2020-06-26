import React from 'react'
import {act} from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'
import {render, waitFor, cleanup} from '@testing-library/react'
import {GoogleMapProvider, GroundOverlay, MapBox} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('GroundOverlay', () => {
  it('can be rendered', async () => {
    const bounds = {
      east: 116,
      west: 115.9,
      north: 39,
      south: 38.8,
    }
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <GroundOverlay />
      </GoogleMapProvider>,
    )
    await waitFor(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <GroundOverlay
            opts={{
              url: 'https://placehold.it/256x256',
              bounds: bounds,
              opacity: 0.5,
            }}
          />
        </GoogleMapProvider>,
      ),
    ),
      act(() =>
        rerender(
          <GoogleMapProvider>
            <MapBox apiKey="FAKE_KEY" />
            <GroundOverlay
              opts={{
                url: 'https://placehold.it/512x512',
                bounds: bounds,
                opacity: 0.8,
                clickable: true,
              }}
            />
          </GoogleMapProvider>,
        ),
      )
    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <GroundOverlay
            opts={{
              url: 'https://placehold.it/512x512',
              bounds: bounds,
              opacity: 0.8,
              clickable: false,
            }}
          />
        </GoogleMapProvider>,
      ),
    )
    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <GroundOverlay
            opts={{
              url: 'https://placehold.it/512x512',
              bounds: bounds,
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
          <GroundOverlay id="ground-overlay" />
          <GroundOverlay id="ground-overlay" />
        </GoogleMapProvider>,
      )
      await waitFor(() => {
        expect(container.innerHTML).not.toMatch('Loading...')
      })
    }

    expect(check()).rejects.toEqual(new Error('The id has already been taken'))
  })
})
