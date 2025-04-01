require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

// Middleware
app.use(express.json())
app.use(express.static('dist'))

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

// Home page - NOT YET RE-IMPLEMENTED TO USE MONGODB
const homePageString = (dateString, people) => {
  numPeople = Object.keys(people).length
  return `Phonebook has info for ${numPeople} people`+ "\n\n" + `${dateString}`
}

app.get('/info', (request, response) => {
  Person.find({}).then(people => {
    console.log('people : ', people);
    var today = new Date();
    response.send(homePageString(today.toString().trim(), people))
  })
})

// Get all
app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

// Find
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

// Post- NOT YET RE-IMPLEMENTED TO USE MONGODB
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  // if (phoneBook.find(person => person.name === body.name)){
  //   return response.status(400).json({ 
  //     error: 'name must be unique' 
  //   })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson =>
    response.json(savedPerson)
  )
})

// Delete- NOT YET RE-IMPLEMENTED TO USE MONGODB
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  phoneBook = phoneBook.filter(person => person.id !== id)
  response.status(204).end()
})

// Unknown Endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})