const mongoose = require('mongoose')

var displayAll = false

if (process.argv.length === 3) {
  displayAll = true
} else if (process.argv.length !== 5) {
  console.log('Please give three arguments: Atlas password, phonebook entry name and phonebook entry number')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.w1mjosx.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (displayAll){
  Person.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
} else {
  const newPerson = new Person({
    name: personName,
    number: personNumber,
  })
  
  newPerson.save().then(result => {
    console.log(`added "${personName}" number ${personNumber} to phonebook`)
    mongoose.connection.close()
  })
}