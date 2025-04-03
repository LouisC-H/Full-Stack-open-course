import { useState, useEffect } from 'react'
import PeopleList from './components/PeopleList'
import Filter from './components/Filter'
import AddPersonForm from './components/AddPersonForm'
import personsAPI from './services/personsDb'
import Notification from './components/Notification'

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  // Links typing in the text boxes to changing the state variables
  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setNameFilter(event.target.value)}

  // Runs on first render to import the 
  useEffect( () => {
    personsAPI
    .getAll()
    .then( 
      initialPeople => {
        setPeople(initialPeople)
      }
    )
  }, [])

  const sendNotification = (message, isError) => {
    setNotifMessage(message)
    setIsError(isError)
    setTimeout(() => {
      setNotifMessage(null)
    }, 5000)
  }

  // Adding a new person to the phonebook
  const addPerson = (event) => {
    event.preventDefault()

    const trimmedName = newName.trim()

    const personObject = {
      name: trimmedName,
      number: newNumber
    }

    // If the person isn't already in the phonebook, add them
    if (!checkNameDupe(trimmedName)) {
      personsAPI
        .create(personObject)
        .then(returnedPerson => {
            setPeople(people.concat(returnedPerson))
          }
        )
        .catch(error => {
          sendNotification(error.response.data.error, true)
        })
        .then(sendNotification(`Added ${trimmedName}.`, false))
    } 
    // Else if they are already in the phonebook, check before overwriting them
    else {
      if (window.confirm(`${trimmedName} is already added to the phonebook, replace the old number with a new one?`)) {
        const id = people.find(person => person.name === trimmedName).id
        
        personsAPI
          .update(id, personObject)
          .then(returnedPerson => {
            setPeople(people.map(person => person.id === id ? returnedPerson : person))
            sendNotification(`Changed ${trimmedName}'s number to ${personObject.number}.`, false)
          })
          .catch(error => {
            sendNotification(error.response.data.error, true)
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
          .then(sendNotification(`Deleted ${name}.`, false))
          .catch(error => {
            sendNotification(`Connection error to the server.`, true)
          }
        )
        setPeople(people.filter(n => n.id !== id))
      }
    }
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} isError={isError} />
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