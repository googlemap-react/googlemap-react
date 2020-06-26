import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, waitFor, cleanup} from '@testing-library/react'
import {GoogleMapProvider, MapBox, TransitLayer} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('TransitLayer', () => {
  it('can be rendered', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <TransitLayer />
      </GoogleMapProvider>,
    )
    await waitFor(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
  })
})
