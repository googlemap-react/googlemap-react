import React from 'react'
import {act} from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'
import {render, wait} from '@testing-library/react'
import {GoogleMapProvider, MapBox, Rectangle} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('Rectangle', () => {
  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider apiKey="FAKE_KEY">
        <MapBox />
        <Rectangle />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() =>
      rerender(
        <GoogleMapProvider apiKey="FAKE_KEY">
          <MapBox />
          <Rectangle
            opts={{
              bounds: {
                east: 116,
                west: 115.9,
                north: 39,
                south: 38.9,
              },
            }}
          />
        </GoogleMapProvider>,
      ),
    )
  })
})
