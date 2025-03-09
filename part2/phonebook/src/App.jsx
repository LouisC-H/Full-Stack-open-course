import { useState, useEffect } from 'react'
import axios from 'axios'
import PeopleList from './components/PeopleList'
import Filter from './components/Filter'
import AddPersonForm from './components/AddPersonForm'

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPeople(response.data)
      })
  }

  useEffect(hook, [])

  const handleNameChange = (event) => {    
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {    
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => { 
    setNameFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (!checkNameDupe(newName.trim())) {
      const personObject = {
        name: newName.trim(),
        number: newNumber
      }
      setPeople(people.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const checkNameDupe = (checkName) => {        
    if (people.some(person => person.name === checkName)) {
      alert(`${checkName} is already added to phonebook`)
      return true
    }
    return false
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} filterStateHandler={handleFilterChange} />

      <h2>Add new entry</h2>
      <AddPersonForm 
        addPerson={addPerson} 
        newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <PeopleList people={people} nameFilter={nameFilter.toLowerCase()} />
    </div>
  )
}

export default App