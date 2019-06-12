import React from 'react'
import {act} from 'react-dom/test-utils'
import 'jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import {render, wait, cleanup} from '@testing-library/react'
import {Circle, GoogleMapProvider, MapBox} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('Circle', () => {
  afterEach(() => {
    cleanup()
  })

  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <Circle />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <Circle
            opts={{
              center: {lat: 31, lng: 18},
              radius: 200,
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
          <Circle id="circle" />
          <Circle id="circle" />
        </GoogleMapProvider>,
      )
      await wait(() => {
        expect(container.innerHTML).not.toMatch('Loading...')
      })
    }

    expect(check()).rejects.toEqual(new Error('The id has already been taken'))
  })
})
