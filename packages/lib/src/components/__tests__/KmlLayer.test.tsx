import React from 'react'
import {act} from 'react-dom/test-utils'
import 'jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import {render, wait, cleanup} from '@testing-library/react'
import {GoogleMapProvider, KmlLayer, MapBox} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('KmlLayer', () => {
  afterEach(() => {
    cleanup()
  })

  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <KmlLayer />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <KmlLayer
            opts={{
              screenOverlays: false,
            }}
          />
        </GoogleMapProvider>,
      ),
    )
  })

  it('of same id cannot be added twice', async () => {
    const check = async () => {
      const {container} = render(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <KmlLayer id="kml-layer" />
          <KmlLayer id="kml-layer" />
        </GoogleMapProvider>,
      )
      await wait(() => {
        expect(container.innerHTML).not.toMatch('Loading...')
      })
    }

    expect(check()).rejects.toEqual(new Error('The id has already been taken'))
  })
})
