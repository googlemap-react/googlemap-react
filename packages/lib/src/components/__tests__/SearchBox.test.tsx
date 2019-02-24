import React from 'react'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import {render, wait, cleanup, act} from 'react-testing-library'
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
            bindingPosition="TOP_CENTER"
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
