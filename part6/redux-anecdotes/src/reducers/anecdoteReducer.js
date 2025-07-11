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
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }}

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newNote))
  }}

export const voteNote = id => {
  return async dispatch => {
    await anecdoteService.incrementVote(id)
    dispatch(addVote(id))
  }}

export default anecdoteSlice.reducer