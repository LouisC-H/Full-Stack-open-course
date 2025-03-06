import { useState } from 'react'

const Header = ({headerText}) => {
  return (
    <h1>{headerText}</h1>
  )
}

const AnecdoteDisplay = ({anecdote, votes}) => {
  return (
    <>
        <div>{anecdote}</div>
        <VotesDisplay numVotes={votes}></VotesDisplay>
    </>
  )
}

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const VotesDisplay =  ({ numVotes }) => (  
  <div>Has {numVotes} vote(s)</div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const numAnecdotes = anecdotes.length;
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [votes, setVotes] = useState(new Array(numAnecdotes).fill(0))

  const genNewIndex = () => {
    const newIndex = Math.floor(Math.random() * (numAnecdotes));
    if (newIndex !== selectedIndex) {
      setSelectedIndex(newIndex)
    } else {
      genNewIndex(selectedIndex)
    }
  }

  const saveVote = () => {
    const copy = { ...votes }
    // increment the property 2 value by one
    copy[selectedIndex] += 1       
    setVotes(copy)
  }

  const findMostVotes = () => {
    let mostVotesIndex = 0
    let mostVotesNum = 0
    for (let index = 0; index < numAnecdotes; index++) {
      const indexVotes = votes[index];
      if (indexVotes > mostVotesNum) {
        mostVotesIndex = index
        mostVotesNum = indexVotes
      }
    }
    return mostVotesIndex
  }

  if (selectedIndex === -1) {
    genNewIndex()
  }

  const mostVotesIndex = findMostVotes();
  
  return (
    <div>
      <Header headerText={"Anecdote of the day"}></Header>
      <AnecdoteDisplay anecdote={anecdotes[selectedIndex]} votes={votes[selectedIndex]}></AnecdoteDisplay>
      <Button text={"Vote"} onClick={() => saveVote()}></Button>
      <Button text={"New anecdote"} onClick={() => genNewIndex()}></Button>
      <Header headerText={"Anecdote with the most votes"}></Header>
      <AnecdoteDisplay anecdote={anecdotes[mostVotesIndex]} votes={votes[mostVotesIndex]}></AnecdoteDisplay>
    </div>
  )
}

export default App