import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from "../../requests/requests"
import { useNotificationDispatch } from '../contexts/NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: `anecdote too shot, must have a length of 5 characters or more`})
    setTimeout(() => dispatch({
      type: 'REMOVE_NOTIFICATION',
      payload: `anecdote too shot, must have a length of 5 characters or more`})
      , 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // Presumably Could be made more efficient with slices/helper functions, but the exercise 
    // wanted useReducer hooks and context to be used
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: `anecdote '${content}' added`})
    setTimeout(() => dispatch({
      type: 'REMOVE_NOTIFICATION',
      payload: `anecdote '${content}' added`})
      , 5000)
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
