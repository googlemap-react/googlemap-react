import React from 'react'
import {act} from 'react-dom/test-utils'
import 'jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import {render, wait, cleanup} from '@testing-library/react'
import {DrawingManager, GoogleMapProvider, MapBox} from '../../..'
import {defineGlobalVariable, EventEmitter} from '../../__test__helpers__'

defineGlobalVariable()

describe('DrawingManager', () => {
  afterEach(() => {
    cleanup()
  })

  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" useDrawing />
        <DrawingManager />
        <EventEmitter />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    await wait(() => {
      expect(container.innerHTML).toMatch('event emitted')
    })
    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" useDrawing />
          <DrawingManager opts={{drawingControl: false}} />
        </GoogleMapProvider>,
      ),
    )
  })
})
