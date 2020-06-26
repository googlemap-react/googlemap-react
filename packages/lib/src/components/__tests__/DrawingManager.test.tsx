import React from 'react'
import {act} from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'
import {render, waitFor, cleanup} from '@testing-library/react'
import {DrawingManager, GoogleMapProvider, MapBox} from '../../..'
import {defineGlobalVariable, EventEmitter} from '../../__test__helpers__'

defineGlobalVariable()

describe('DrawingManager', () => {
  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" useDrawing />
        <DrawingManager />
        <EventEmitter />
      </GoogleMapProvider>,
    )
    await waitFor(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    await waitFor(() => {
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
