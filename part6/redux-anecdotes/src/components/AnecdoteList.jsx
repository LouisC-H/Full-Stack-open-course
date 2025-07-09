import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdoteSorter = (anecdoteList) => {
    return anecdoteList.sort((a, b) => b.votes - a.votes)
  }
  const anecdotes = anecdoteSorter(useSelector(state => state))

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          anecdote={anecdote}
          handleClick={() => dispatch(voteAnecdote(anecdote.id))}
        />
      )}
    </div>
  )
}

export default AnecdoteList
