import React, {useState} from 'react'
import {act} from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'
import loadjs from 'loadjs'
import {render, wait, fireEvent} from '@testing-library/react'
import {GoogleMapProvider, MapBox} from '../../..'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

beforeEach(() => {
  console.error = jest.fn()
  jest.spyOn(loadjs, 'ready')
  jest.spyOn(loadjs, 'reset')
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('MapBox', () => {
  it('does not render map if fetch failed', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox />
      </GoogleMapProvider>,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await new Promise(resolve => setTimeout(() => resolve(), 500))
    expect(console.error).toHaveBeenCalledWith('Unable to fetch Google Map sdk')
    expect(loadjs.reset).toHaveBeenCalledTimes(1)
    expect(container.innerHTML).toMatch('Loading...')
  })

  it('renders map after fetch succeeded', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider apiKey="FAKE_KEY">
        <MapBox />
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
      <GoogleMapProvider apiKey="FAKE_KEY">
        <MapBox
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
      <GoogleMapProvider apiKey="FAKE_KEY" usePlaces>
        <MapBox />
      </GoogleMapProvider>,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
  })

  it('supports localization', async () => {
    const {container} = render(
      <GoogleMapProvider apiKey="FAKE_KEY" language="fr" region="FR">
        <MapBox />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
  })

  // TODO
  it('triggers lazy loading of Google API', async () => {
    const TriggerableMap = () => {
      const [visible, setVisible] = useState(false)
      const handleClick = () => setVisible(visible => !visible)
      return (
        <GoogleMapProvider apiKey="FAKE_KEY">
          <button id="button" onClick={handleClick}>
            Click
          </button>
          {visible ? <MapBox /> : null}
        </GoogleMapProvider>
      )
    }

    const {container, getByText} = render(<TriggerableMap />)
    expect(loadjs.ready).not.toHaveBeenCalled()
    expect(container.innerHTML).not.toMatch('Loading...')
    fireEvent.click(getByText('Click'))
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
  })
})
