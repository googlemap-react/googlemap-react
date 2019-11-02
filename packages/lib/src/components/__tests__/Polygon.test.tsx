import React from 'react'
import {act} from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'
import {render, wait, cleanup} from '@testing-library/react'
import {GoogleMapProvider, MapBox, Polygon} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('Polygon', () => {
  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider apiKey="FAKE_KEY">
        <MapBox />
        <Polygon />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() =>
      rerender(
        <GoogleMapProvider apiKey="FAKE_KEY">
          <MapBox />
          <Polygon
            opts={{
              paths: [
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
})
