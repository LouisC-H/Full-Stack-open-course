import { createSlice, current } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToAdd = state.find(n => n.id === id)
      const addedAnecdote = { 
        ...anecdoteToAdd, 
        votes: anecdoteToAdd.votes + 1
      }
      return state.map( anecdote =>
        anecdote.id !== id ? anecdote : addedAnecdote 
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer