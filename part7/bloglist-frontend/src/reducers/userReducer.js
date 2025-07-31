import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogService'
import userService from '../services/userService'

const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state) {
        return ''
    },
    
  }
})

export const { setUser, removeUser } = userSlice.actions

export const logUserIn = (user) => {  
  return async dispatch => {
    const userList = await userService.getAllUsers();
    dispatch(setUser({user: user, userList: userList}))
    blogService.setToken(user.token);
  }}

export const logUserOut = () => {  
  return async dispatch => {
    dispatch(removeUser())
    blogService.setToken('');
  }}

export default userSlice.reducer