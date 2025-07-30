import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
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

export const { appendAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {  
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }}

export const voteAnecdote = id => {
  return async dispatch => {
    await anecdoteService.incrementVote(id)
    dispatch(addVote(id))
  }}

export default anecdoteSlice.reducer