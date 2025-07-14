import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from '../requests/requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const anecdotes = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(anecdotes)))

  if ( anecdotes.isLoading ) {
    return <div>loading data...</div>
  } else if ( anecdotes.isError ) {
    return <div>anecdote service not available due to problems in server...</div>
  }
  
  const anecdotesList = anecdotes.data

  const handleVote = (anecdote) => {
    console.log('vote')
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
