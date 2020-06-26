import React from 'react'
import {act} from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'
import {render, waitFor, cleanup} from '@testing-library/react'
import {GoogleMapProvider, MapBox, Polyline} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('Polyline', () => {
  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <Polyline />
      </GoogleMapProvider>,
    )
    await waitFor(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <Polyline
            opts={{
              path: [
                {lat: 31, lng: 18},
                {lat: 36, lng: 19},
                {lat: 39, lng: 20},
              ],
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
          <Polyline id="polyline" />
          <Polyline id="polyline" />
        </GoogleMapProvider>,
      )
      await waitFor(() => {
        expect(container.innerHTML).not.toMatch('Loading...')
      })
    }

    expect(check()).rejects.toEqual(new Error('The id has already been taken'))
  })
})
