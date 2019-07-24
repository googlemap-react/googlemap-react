import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import {render, wait, cleanup, act} from '@testing-library/react'
import {GoogleMapProvider, MapBox, SearchBox} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('SearchBox', () => {
  afterEach(() => {
    cleanup()
  })

  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" usePlaces />
        <SearchBox bindingPosition="TOP_CENTER" />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() => {
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" usePlaces />
          <SearchBox
            bindingPosition="TOP_RIGHT"
            opts={{
              bounds: {
                east: -73.98,
                west: -73.985,
                north: 40.706,
                south: 40.702,
              },
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
