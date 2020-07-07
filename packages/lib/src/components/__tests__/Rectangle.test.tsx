import React from 'react'
import {act} from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'
import {render, waitFor, cleanup} from '@testing-library/react'
import {GoogleMapProvider, MapBox, Rectangle} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('Rectangle', () => {
  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <Rectangle />
      </GoogleMapProvider>,
    )
    await waitFor(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
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

  it('of same id cannot be added twice', async () => {
    const check = async () => {
      const {container} = render(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <Rectangle id="rectangle" />
          <Rectangle id="rectangle" />
        </GoogleMapProvider>,
      )
      await waitFor(() => {
        expect(container.innerHTML).not.toMatch('Loading...')
      })
    }

    await expect(check()).rejects.toThrow(
      new Error('The id has already been taken'),
    )
  })
})
