import React from 'react'
import {GoogleMapProvider} from '../GoogleMapContext'
import {render, wait} from '@testing-library/react'
import {defineGlobalVariable, ActionDispatcher} from '../../__test__helpers__'

defineGlobalVariable()

beforeEach(() => {
  console.error = jest.fn()
})

describe('The dispatcher throws an error when trying to', () => {
  it('init map without a map instance', async () => {
    render(
      <GoogleMapProvider>
        <ActionDispatcher action={{type: 'init_map'}} />
      </GoogleMapProvider>,
    )
    await wait(() => {})
    expect(console.error).toHaveBeenCalledWith(
      'You should specify a map instance',
    )
  })

  it('add more than one map to one context', async () => {
    const map = new google.maps.Map(document.createElement('div'), {zoom: 14})
    render(
      <GoogleMapProvider>
        <ActionDispatcher action={{type: 'init_map', map: map}} />
        <ActionDispatcher action={{type: 'init_map', map: map}} />
      </GoogleMapProvider>,
    )
    await wait(() => {})

    expect(console.error).toHaveBeenCalledWith(
      'There can only be one map instance in a context',
    )
  })
})

describe('The dispatcher will', () => {
  it('reset the map', () => {
    expect(() => {
      const marker = new google.maps.Marker({position: {lat: 0, lng: 0}})
      render(
        <GoogleMapProvider>
          <ActionDispatcher
            action={{type: 'add_object', object: marker, id: 'marker'}}
          />
          <ActionDispatcher action={{type: 'reset'}} />
        </GoogleMapProvider>,
      )
    }).not.toThrow()
  })

  it('ignore undefined action types', () => {
    expect(() => {
      render(
        <GoogleMapProvider>
          <ActionDispatcher action={{type: 'undefined'}} />
        </GoogleMapProvider>,
      )
    }).not.toThrow()
  })
})
