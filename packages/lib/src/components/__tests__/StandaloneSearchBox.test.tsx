import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, wait, cleanup} from '@testing-library/react'
import {GoogleMapProvider, MapBox, StandaloneSearchBox} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('StandaloneSearchBox', () => {
  it('can be rendered', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" usePlaces />
        <StandaloneSearchBox id="search-box" />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
  })
})
