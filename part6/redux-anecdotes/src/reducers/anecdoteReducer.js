const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSorter = (anecdoteList) => {
  console.log('anecdoteList : ', anecdoteList);
  console.log('anecdoteList.sort((a, b) => b.votes - a.votes) : ', anecdoteList.sort((a, b) => b.votes - a.votes));
  return anecdoteList.sort((a, b) => b.votes - a.votes)
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch(action.type) {
    case 'NEW_NOTE': {
      const newNotesList = [...state, action.data]
      return anecdoteSorter(newNotesList)}
    case 'ADD_VOTE': {
      const id = action.data.id
      const noteToAdd = state.find(n => n.id === id)
      const addedNote = { 
        ...noteToAdd, 
        votes: noteToAdd.votes + 1
      }
      const newNotesList = state.map( note =>
        note.id !== id ? note : addedNote 
      )
      return anecdoteSorter(newNotesList)}
    default:
      return state
  }
}

export default reducer