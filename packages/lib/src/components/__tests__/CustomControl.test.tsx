import React from 'react'
import {act} from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'
import {render, wait} from '@testing-library/react'
import {CustomControl, GoogleMapProvider, MapBox} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('CustomControl', () => {
  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider apiKey="FAKE_KEY">
        <MapBox />
        <CustomControl bindingPosition="LEFT_TOP">
          <p>This is a custom control</p>
        </CustomControl>
      </GoogleMapProvider>,
    )

    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })

    act(() => {
      rerender(
        <GoogleMapProvider apiKey="FAKE_KEY">
          <MapBox />
          <CustomControl bindingPosition="BOTTOM_CENTER">
            <p>This is a custom control</p>
          </CustomControl>
        </GoogleMapProvider>,
      )
    })
  })
})
