import React from 'react'
import {GoogleMapProvider} from '../GoogleMapContext'
import {render, wait} from '@testing-library/react'
import {defineGlobalVariable, ActionDispatcher} from '../../__test__helpers__'

defineGlobalVariable()

beforeEach(() => {
  console.error = jest.fn()
})

describe('The dispatcher throws an error when trying to', () => {
  it('add an object without an object instance', async () => {
    render(
      <GoogleMapProvider>
        <ActionDispatcher action={{type: 'add_object'}} />
      </GoogleMapProvider>,
    )
    await wait(() => {})

    expect(console.error).toHaveBeenCalledWith(
      'You should specify an object instance',
    )
  })

  it('add an object without an id', async () => {
    const marker = new google.maps.Marker({position: {lat: 0, lng: 0}})
    render(
      <GoogleMapProvider>
        <ActionDispatcher action={{type: 'add_object', object: marker}} />
      </GoogleMapProvider>,
    )
    await wait(() => {})

    expect(console.error).toHaveBeenCalledWith('You should specify an id')
  })

  it('use the same id more than once', async () => {
    const marker = new google.maps.Marker({position: {lat: 0, lng: 0}})
    render(
      <GoogleMapProvider>
        <ActionDispatcher
          action={{type: 'add_object', object: marker, id: 'marker'}}
        />
        <ActionDispatcher
          action={{type: 'add_object', object: marker, id: 'marker'}}
        />
      </GoogleMapProvider>,
    )

    await wait(() => {})

    expect(console.error).toHaveBeenCalledWith('The id has already been taken')
  })

  it('remove an object without an id', async () => {
    render(
      <GoogleMapProvider>
        <ActionDispatcher action={{type: 'remove_object'}} />
      </GoogleMapProvider>,
    )
    await wait(() => {})

    expect(console.error).toHaveBeenCalledWith('You should specify an id')
  })

  it('remove a non-existing object', async () => {
    render(
      <GoogleMapProvider>
        <ActionDispatcher action={{type: 'remove_object', id: 'marker'}} />
      </GoogleMapProvider>,
    )
    await wait(() => {})

    expect(console.error).toHaveBeenCalledWith(
      'There is no object with the given id',
    )
  })
})

describe('The dispatcher will', () => {
  it('add and remove an object', async () => {
    expect(() => {
      const marker = new google.maps.Marker({position: {lat: 0, lng: 0}})
      render(
        <GoogleMapProvider>
          <ActionDispatcher
            action={{type: 'add_object', object: marker, id: 'marker'}}
          />
          <ActionDispatcher action={{type: 'remove_object', id: 'marker'}} />
        </GoogleMapProvider>,
      )
    }).not.toThrow()
  })
})
