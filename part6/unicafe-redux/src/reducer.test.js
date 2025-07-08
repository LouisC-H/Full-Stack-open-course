import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  const goodAction = {
    type: 'GOOD'
  }
  const okAction = {
    type: 'OK'
  }
  const badAction = {
    type: 'BAD'
  }
  const zeroAction = {
    type: 'ZERO'
  }

  let state = {}

  beforeEach(() => {
    state = initialState
  })
  

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }
    
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    deepFreeze(state)
    const newState = counterReducer(state, goodAction)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

    test('OK is incremented', () => {
    
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, okAction)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    deepFreeze(state)
    const newState = counterReducer(state, badAction)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('zero resets all counters', () => {
    deepFreeze(state)
    let newState = counterReducer(state, goodAction)
    newState = counterReducer(newState, okAction)
    newState = counterReducer(newState, okAction)
    newState = counterReducer(newState, badAction)
    newState = counterReducer(newState, badAction)
    newState = counterReducer(newState, badAction)
    newState = counterReducer(newState, zeroAction)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})