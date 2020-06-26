import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, waitFor, cleanup, act} from '@testing-library/react'
import {GoogleMapProvider, MapBox, TrafficLayer} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('TrafficLayer', () => {
  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <TrafficLayer />
      </GoogleMapProvider>,
    )
    await waitFor(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() => {
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <TrafficLayer opts={{autoRefresh: false}} />
        </GoogleMapProvider>,
      )
    })
  })
})
