import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogService'
import { setNotification } from "../reducers/notificationReducer";

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    addLike(state, action) {
      const id = action.payload
      const blogToAdd = state.find(n => n.id === id)
      const newBlog = { 
        ...blogToAdd, 
        likes: blogToAdd.likes + 1
      }
      return sortBlogs(state.map( anecdote =>
        anecdote.id !== id ? anecdote : newBlog 
      ))
    },
    setBlogs(state, action) {
      return sortBlogs(action.payload)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

export const { appendBlog, addLike, setBlogs, removeBlog } = blogSlice.actions

export const initialiseBlogs = () => {    
  return async dispatch => {
    const initialisedBlogs = await blogService.getAll()
    dispatch(setBlogs(initialisedBlogs))
  }}

export const createBlog = content => {
  return async dispatch => {
    try {
        const newBlog = await blogService.create(content)
        dispatch(setNotification(`Blog ${newBlog.title} by ${newBlog.author} has been created`, false, 5));
        dispatch(appendBlog(newBlog))
      } catch (error) {
        dispatch(setNotification(`Error creating blog: ${error.response.data.error}`, true, 5));
      }
  }}

export const likeBlog = blog => {
  return async dispatch => {
    try {
        await blogService.incrementLikes(blog.id)
        dispatch(setNotification(`Blog ${blog.title} by ${blog.author} has been liked`, false, 5));
        dispatch(addLike(blog.id))  
      } catch (error) {
        dispatch(setNotification(`Error liking blog: ${error.response.data.error}`, true, 5));
      }
  }
}

export const deleteBlog = blog => {
  if (window.confirm(`Remove ${blog.title} ${blog.author} ?`)) {
    return async dispatch => {
      try {
        await blogService.remove(blog.id)
        dispatch(removeBlog(blog.id))
        dispatch(setNotification(`Blog ${blog.title} by ${blog.author} removed`, false, 5));
      } catch (error) {
        dispatch(setNotification(`Error removing blog: ${error.response.data.error}`, true, 5));
      }
      
    }  
  }
}

const sortBlogs = (blogsList) => {
  // Sort the blogs by likes in descending order
  return blogsList.sort((a, b) => b.likes - a.likes);
};

export default blogSlice.reducer