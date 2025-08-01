import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
        return action.payload
    case "REMOVE_NOTIFICATION":
      // Note: added complexity is a crutch to help prevent notifications instantly being closed 
      // if multiple different ones are triggered in quick succession. 
      if (state == action.payload) {
        return ''
      } else return state
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext