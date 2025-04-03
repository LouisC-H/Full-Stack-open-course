require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

// Middleware
app.use(express.static('dist'))
app.use(express.json())


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

//Routes:
// Home page
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
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

// Post
app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  const person = new Person({
    name: name,
    number: number,
  })

  person.save()
  .then(savedPerson =>
    response.json(savedPerson)
  ).catch(error => next(error))
})

// Delete
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Put
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save()
      .then(updatedPerson => 
        response.json(updatedPerson)
      )
    })
    .catch(error => next(error))
})

// Unknown Endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Error handling:
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})