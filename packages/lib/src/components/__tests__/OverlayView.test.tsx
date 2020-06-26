import React from 'react'
import {act} from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'
import {render, waitFor} from '@testing-library/react'
import {GoogleMapProvider, MapBox, OverlayView} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

const mockOverlayDraw = async (container: HTMLElement) => {
  await waitFor(() => {
    expect(container.innerHTML).not.toMatch('Loading...')
  })

  // wait for mocked onAdd to be triggered
  await waitFor(() => {
    expect(document.body.innerHTML).toMatch('This is an overlay')
  })
}

describe('OverlayView', () => {
  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <OverlayView>
          <p>This is an overlay</p>
        </OverlayView>
      </GoogleMapProvider>,
    )

    await mockOverlayDraw(container)

    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <OverlayView position={{lat: 30, lng: 110}}>
            <p>This is an overlay</p>
          </OverlayView>
        </GoogleMapProvider>,
      ),
    )

    await mockOverlayDraw(container)
  })

  it('can disable map hits', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <OverlayView disableMapHits>
          <p>This is an overlay with hits disabled</p>
        </OverlayView>
      </GoogleMapProvider>,
    )

    await mockOverlayDraw(container)
  })

  it('can disable map hits and gestures', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <OverlayView disableMapHitsAndGestures>
          <h1>This is an overlay with hits and gestures disabled</h1>
        </OverlayView>
      </GoogleMapProvider>,
    )

    await mockOverlayDraw(container)
  })
})
