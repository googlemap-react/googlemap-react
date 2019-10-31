import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import loadjs from 'loadjs'
import {render, wait, act} from '@testing-library/react'
import {GoogleMapProvider, MapBox} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('MapBox', () => {
  let mockConsoleError

  beforeEach(() => {
    console.error = jest.fn()
    mockConsoleError = console.error
    jest.spyOn(console, 'error')
    jest.spyOn(loadjs, 'reset')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('does not render map if fetch failed', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox />
      </GoogleMapProvider>,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Unable to fetch Google Map sdk',
      )
    })
    expect(loadjs.reset).toHaveBeenCalled()
    expect(container.innerHTML).toMatch('Loading...')
  })

  it('renders map after fetch succeeded', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
      </GoogleMapProvider>,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    expect(loadjs.reset).not.toHaveBeenCalled()
    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox opts={{center: {lat: 39, lng: 116}}} />
        </GoogleMapProvider>,
      ),
    )
  })

  it('registers event listeners properly', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox
          apiKey="FAKE_KEY"
          onClick={() => {
            console.log('clicked')
          }}
        />
      </GoogleMapProvider>,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    expect(loadjs.reset).not.toHaveBeenCalled()
  })

  it('registers places service', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" usePlaces />
      </GoogleMapProvider>,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
  })

  it('supports localization', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" language="fr" region="FR" />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
  })
})
