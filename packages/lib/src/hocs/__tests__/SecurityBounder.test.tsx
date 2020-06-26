import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, cleanup, waitFor} from '@testing-library/react'
import {GoogleMapProvider, MapBox, withSecurityBounder} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'
import {HeatmapLayer} from '../../__test__helpers__/defineGlobalVariable'

const FakeHeatMap = () => <p>This is a heat map</p>

const WrappedFakeHeatMap = withSecurityBounder(FakeHeatMap)

defineGlobalVariable()

// remove google.maps.visualization
if (google && google.maps) {
  delete google.maps.visualization
}

describe('Security Bounder', () => {
  it('sets a time interval if google.maps.visualization is not ready', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <WrappedFakeHeatMap />
      </GoogleMapProvider>,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await waitFor(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })

    // readd google.maps.visualization
    setTimeout(() => {
      Object.defineProperty(google.maps, 'visualization', {
        value: {
          HeatmapLayer: HeatmapLayer,
        },
      })
    }, 500)

    await waitFor(() => {
      expect(container.innerHTML).toMatch('This is a heat map')
    })
  })
})
