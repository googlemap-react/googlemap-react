import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, waitFor, cleanup} from '@testing-library/react'
import {GoogleMapProvider, MapBox, StandaloneStreetView} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('StandaloneSearchBox', () => {
  it('can be rendered', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" usePlaces />
        <StandaloneStreetView id="standalone-street-view" />
      </GoogleMapProvider>,
    )
    await waitFor(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
  })
})
