import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, waitFor, cleanup, act} from '@testing-library/react'
import {GoogleMapProvider, MapBox, Autocomplete} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('Autocomplete', () => {
  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" usePlaces />
        <Autocomplete bindingPosition="TOP_CENTER" />
      </GoogleMapProvider>,
    )
    await waitFor(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() => {
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" usePlaces />
          <Autocomplete
            bindingPosition="TOP_RIGHT"
            opts={{
              bounds: {
                east: -73.98,
                west: -73.985,
                north: 40.706,
                south: 40.702,
              },
              fields: ['address_components'],
            }}
          />
        </GoogleMapProvider>,
      )
    })
    act(() => {
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" usePlaces />
        </GoogleMapProvider>,
      )
    })
  })
})
