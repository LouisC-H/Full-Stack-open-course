import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      console.log('action : ', action);
      return action.payload
  }}
})

export const { setNotification, setFilter } = notificationSlice.actions
export default notificationSlice.reducer