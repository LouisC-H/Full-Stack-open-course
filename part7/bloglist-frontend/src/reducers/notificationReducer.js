import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      console.log('action : ', action);
      return action.payload
    },
    removeNotification(state, action) {
      // Note: added complexity is a crutch to help prevent notifications instantly being closed 
      // if multiple different ones are triggered in quick succession. 
      if (state.message === action.payload) {
        return ''
      } else return state
    },
    
  }
})

export const { showNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, isError, displaySecs) => {  
  return async dispatch => {
    dispatch(showNotification({message, isError}))
    setTimeout(() => {
      dispatch(removeNotification(message))
    }, displaySecs*1000)
  }}

export default notificationSlice.reducer