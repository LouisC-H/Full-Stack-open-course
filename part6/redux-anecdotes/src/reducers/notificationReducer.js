import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      // Note: added complexity is a crutch to help prevent notifications instantly being closed 
      // if multiple different ones are triggered in quick succession. 
      if (state == action.payload) {
        return ''
      } else return state
    },
    
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer