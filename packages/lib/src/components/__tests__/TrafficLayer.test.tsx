import React from 'react'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import {render, wait, cleanup, act} from 'react-testing-library'
import {GoogleMapProvider, MapBox, TrafficLayer} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('TrafficLayer', () => {
  afterEach(() => {
    cleanup()
  })

  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <TrafficLayer />
      </GoogleMapProvider>,
    )
    await wait(() => {
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
