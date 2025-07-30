import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogService'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initialiseBlogs = () => {  
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }}

export const createBlog = content => {
  return async dispatch => {
    const newNote = await blogService.create(content)
    dispatch(appendBlog(newNote))
  }}

export default blogSlice.reducer