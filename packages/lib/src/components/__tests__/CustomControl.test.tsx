import React from 'react'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import {render, cleanup, wait} from 'react-testing-library'
import {CustomControl, GoogleMapProvider, MapBox} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('CustomControl', () => {
  afterEach(() => {
    cleanup()
  })

  it('can be rendered', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <CustomControl>
          <p>This is a custom control</p>
        </CustomControl>
      </GoogleMapProvider>,
    )

    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
  })
})
