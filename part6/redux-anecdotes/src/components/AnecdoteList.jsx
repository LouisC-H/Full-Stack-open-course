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

  const anecdotes = useSelector(state => {
    // Filter anecdotes based on the current filter state
    return state.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })

  if (anecdotes) {
    const sortedAnecdotes = anecdoteSorter(anecdotes)

    return (
      <div>
        {sortedAnecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => dispatch(voteAnecdote(anecdote.id))}
          />
        )}
      </div>
    )
  }


}

export default AnecdoteList
