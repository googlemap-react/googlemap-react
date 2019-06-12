import React from 'react'
import 'jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import {render, wait, cleanup} from '@testing-library/react'
import {GoogleMapProvider, MapBox, StandaloneSearchBox} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('StandaloneSearchBox', () => {
  afterEach(() => {
    cleanup()
  })

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
