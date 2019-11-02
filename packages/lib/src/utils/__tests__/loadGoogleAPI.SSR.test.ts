import React from 'react'
import loadGoogleAPI from '../loadGoogleAPI'
import initialState from '../../contexts/GoogleMapStateInitializer'

beforeEach(() => {
  delete (global as any).document
})

describe('loadGoogleAPI', () => {
  it('should not load Google API on the server side', async () => {
    await expect(loadGoogleAPI(initialState())).rejects.toEqual(
      'This operation should be done on the client side',
    )
  })
})
