import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const incrementVote = async (id) => {
  const idURL = baseUrl+`/${id}`
  const oldAnecdoteResponse = await axios.get(idURL)
  const oldAnecdote = oldAnecdoteResponse.data
  const newAnecdote = {
    ...oldAnecdote,
    votes: oldAnecdote.votes + 1
  }
  const response = await axios.put(idURL, newAnecdote)
  return response.data
}

export default { getAll, createNew, incrementVote }