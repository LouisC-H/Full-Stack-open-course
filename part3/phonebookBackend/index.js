const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

let phoneBook = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.use(express.json())
app.use(cors())

morgan.token('personPOST', function (req, res) {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  return JSON.stringify(person);
});
app.use(morgan('tiny', {
  skip: function (req, res) { return req.method === "POST" }
}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :personPOST', {
    skip: function (req, res) { return req.method !== "POST" }
}))

// Home page
const homePageString = (dateString, phoneBook) => {
  numPeople = Object.keys(phoneBook).length
  return `Phonebook has info for ${numPeople} people`+ "\n\n" + `${dateString}`
}

app.get('/info', (request, response) => {
  var today = new Date();
  response.send(homePageString(today.toString().trim(), phoneBook))
})

// Get all
app.get('/api/persons', (request, response) => {
  response.json(phoneBook)
})

// Find
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = phoneBook.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Post
const generateId = () => {
  return String(Math.round(Math.random()*1000000))
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  if (phoneBook.find(person => person.name === body.name)){
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  phoneBook = phoneBook.concat(person)

  response.json(person)
})

// Delete
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  phoneBook = phoneBook.filter(person => person.id !== id)
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})