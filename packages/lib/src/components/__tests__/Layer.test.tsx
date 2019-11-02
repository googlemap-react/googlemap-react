import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, wait, cleanup} from '@testing-library/react'
import {GoogleMapProvider, Layer, MapBox} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('Layer', () => {
  it('of same type cannot be added twice', async () => {
    const check = async () => {
      const {container} = render(
        <GoogleMapProvider apiKey="FAKE_KEY">
          <MapBox />
          <Layer type="bicycling" />
          <Layer type="bicycling" />
        </GoogleMapProvider>,
      )
      await wait(() => {
        expect(container.innerHTML).not.toMatch('Loading...')
      })
    }

    expect(check()).rejects.toEqual(new Error('The id has already been taken'))
  })
})
