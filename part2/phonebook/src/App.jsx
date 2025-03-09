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

    const personObject = {
      name: newName.trim(),
      number: newNumber
    }

    // If the person isn't already in the phonebook, add them
    if (!checkNameDupe(newName.trim())) {
      personsAPI
        .create(personObject)
        .then(returnedPerson => {
            setPeople(people.concat(returnedPerson))
          }
        )
    } 
    // Else if they are already in the phonebook, check before overwriting them
    else {
      if (window.confirm(`${personObject.name} is already added to the phonebook, replace the old number with a new one?`)) {
        const id = people.find(person => person.name === personObject.name).id
        console.log(id);
        
        personsAPI
          .update(id, personObject)
          .then(returnedPerson => {
            setPeople(people.map(person => person.id === id ? returnedPerson : person))
          })
          .catch(error => {
            alert(
              `Oops, the person '${personObject.name}' never properly existed in the server. Please submit them again.`
            )
            setPeople(people.filter(n => n.id !== id))
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  // Checks whether two names are identical, and if so returns true and sends an alert
  const checkNameDupe = (checkName) => {        
    if (people.some(person => person.name === checkName)) {
      return true
    }
    return false
  }

  // Deleting an existing user.
    const deletePerson = (id, name) => {
      
      if (window.confirm(`Delete ${name} ?`)) {
        personsAPI
          .remove(id)
          .catch(error => {
            alert(
              `the person '${name}' was already deleted from server`
            )
          }
        )
        setPeople(people.filter(n => n.id !== id))
      }
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