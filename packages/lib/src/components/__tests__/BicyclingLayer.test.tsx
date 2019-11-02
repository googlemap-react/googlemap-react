import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, wait, cleanup} from '@testing-library/react'
import {BicyclingLayer, GoogleMapProvider, MapBox} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('BicyclingLayer', () => {
  it('can be rendered', async () => {
    const {container} = render(
      <GoogleMapProvider apiKey="FAKE_KEY">
        <MapBox />
        <BicyclingLayer />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
  })
})
