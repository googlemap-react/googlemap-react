import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, cleanup, wait} from '@testing-library/react'
import {GoogleMapProvider, MapBox, OverlayView} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

const mockAddDrawRemove = async (container: HTMLElement) => {
  await wait(() => {
    expect(container.innerHTML).not.toMatch('Loading...')
  })

  // wait for mocked onAdd to be triggered
  await wait(() => {
    expect(document.body.innerHTML).toMatch('This is an overlay')
  })

  // wait for mocked onRemove to be triggered
  await wait(() => {
    expect(document.body.innerHTML).not.toMatch('This is an overlay')
  })
}

describe('OverlayView', () => {
  it('can be rendered', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <OverlayView>
          <p>This is an overlay</p>
        </OverlayView>
      </GoogleMapProvider>,
    )

    await mockAddDrawRemove(container)
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

    await mockAddDrawRemove(container)
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

    await mockAddDrawRemove(container)
  })
})
