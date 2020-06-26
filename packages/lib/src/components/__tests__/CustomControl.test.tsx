import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, cleanup, waitFor, act} from '@testing-library/react'
import {CustomControl, GoogleMapProvider, MapBox} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('CustomControl', () => {
  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <CustomControl bindingPosition="LEFT_TOP">
          <p>This is a custom control</p>
        </CustomControl>
      </GoogleMapProvider>,
    )

    await waitFor(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })

    act(() => {
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <CustomControl bindingPosition="BOTTOM_CENTER">
            <p>This is a custom control</p>
          </CustomControl>
        </GoogleMapProvider>,
      )
    })
  })
})
