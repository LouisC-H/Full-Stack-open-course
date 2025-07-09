import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

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
            handleClick={() => {
              dispatch(addVote(anecdote.id))
              dispatch(setNotification(`Vote added to: "${anecdote.content}"`))
              setTimeout(() => {
                dispatch(removeNotification(`Vote added to: "${anecdote.content}"`))
              }, 5000)
            }}
          />
        )}
      </div>
    )
  }


}

export default AnecdoteList
