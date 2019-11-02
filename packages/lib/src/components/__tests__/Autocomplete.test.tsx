import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, wait, cleanup, act} from '@testing-library/react'
import {GoogleMapProvider, MapBox, Autocomplete} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('Autocomplete', () => {
  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider apiKey="FAKE_KEY" usePlaces>
        <MapBox />
        <Autocomplete bindingPosition="TOP_CENTER" />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() => {
      rerender(
        <GoogleMapProvider apiKey="FAKE_KEY" usePlaces>
          <MapBox />
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
        <GoogleMapProvider apiKey="FAKE_KEY" usePlaces>
          <MapBox />
        </GoogleMapProvider>,
      )
    })
  })
})
