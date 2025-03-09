import { useState, useEffect } from 'react'
import PeopleList from './components/PeopleList'
import Filter from './components/Filter'
import AddPersonForm from './components/AddPersonForm'
import personsAPI from '../services/personsAPI'

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  // Links typing in the text boxes to changing the state variables
  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setNameFilter(event.target.value)}

  // Runs on first render to import the 
  useEffect( () => {
    personsAPI
    .getAll()
    .then( initialPeople => {
        setPeople(initialPeople)
      }
    )
  }, [])

  // Adding a new person to the phonebook
  const addPerson = (event) => {
    event.preventDefault()
    if (!checkNameDupe(newName.trim())) {
      const personObject = {
        name: newName.trim(),
        number: newNumber
      }
      
      personsAPI
        .create(personObject)
        .then(returnedPerson => {
            setPeople(people.concat(returnedPerson))
          }
        )
      setNewName('')
      setNewNumber('')
    }
  }

  // Deleting an existing user.
    const deletePerson = (id, name) => {
      
      if (window.confirm(`Delete ${name} ?`)) {
        setPeople(people.filter(n => n.id !== id))
        personsAPI
          .remove(id)
          .catch(error => {
            alert(
              `the person '${name}' was already deleted from server`
            )
            setPeople(people.filter(n => n.id !== id))
          }
        )
      }
    }

  // Checks whether two names are identical, and if so returns true and sends an alert
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
      <PeopleList 
        people={people} 
        nameFilter={nameFilter.toLowerCase()}
        deleteFunc={deletePerson}
      />
    </div>
  )
}

export default App