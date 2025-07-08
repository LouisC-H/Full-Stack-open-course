import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  test('increments vote with action ADD_VOTE', () => {
    const state = [
      {
        content: 'yes yes, very wise',
        id: 1,
        votes: 12345
      }]

    const action = {
      type: 'ADD_VOTE',
      data: {
        id: 1
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    
    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual({
        content: 'yes yes, very wise',
        id: 1,
        votes: 12346
      })
  })

  test('add a new content anecdote with action NEW_NOTE', () => {
    const state = []

    const action = {
      type: 'NEW_NOTE',
      data: {
        content: 'I went to the zoo the other day...',
        id: 2,
        votes: 2
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    
    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual({
        content: 'I went to the zoo the other day...',
        id: 2,
        votes: 2
      })
  })

  // test('check that anecdotes are sorted by votes', () => {
  //   const state = [
  //     {
  //       content: 'First anecdote',
  //       id: 1,
  //       votes: 1
  //     }, {
  //       content: 'Second anecdote',
  //       id: 2,
  //       votes: 2
  //     }, {
  //       content: 'Third anecdote',
  //       id: 3,
  //       votes: 3
  //     }]

  //   const action = {
  //     type: 'ADD_VOTE',
  //     data: {
  //       id: 2
  //     }
  //   }

  //   deepFreeze(state)
  //   // Add two votes to the second anecdote
  //   const newState = anecdoteReducer(anecdoteReducer(state, action), action)
  //   // Now votes should be 1, 4, 3, so order goes Second, Third, First once sorted
  //   expect(newState[0].id).toBe(2)  
  //   expect(newState[1].id).toBe(3)
  //   expect(newState[2].id).toBe(1)
  // })
})