import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../requests/requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './contexts/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const anecdotes = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  if ( anecdotes.isLoading ) {
    return <div>loading data...</div>
  } else if ( anecdotes.isError ) {
    return <div>anecdote service not available due to problems in server...</div>
  }

  const anecdotesList = anecdotes.data

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes += 1 })
    // Presumably Could be made more efficient with slices/helper functions, but the exercise 
    // wanted useReducer hooks and context to be used
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: `anecdote '${anecdote.content}' voted on`})
    setTimeout(() => dispatch({
      type: 'REMOVE_NOTIFICATION',
      payload: `anecdote '${anecdote.content}' voted on`})
      , 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotesList.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
