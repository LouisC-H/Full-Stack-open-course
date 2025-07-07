import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import noteService from './services/notesDb'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NewNoteForm from './components/NewNoteForm'
import LoggedInStatus from './components/LoggedInStatus'
import Togglable from './components/Togglable'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect( () => {
    noteService
      .getAll()
      .then(initialNotes  => {
        setNotes(initialNotes )
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote  => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

  const noteFormRef = useRef()

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote  => {
        setNotes(notes.concat(returnedNote))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ?
      <Togglable buttonLabel='log in'>
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage}/> 
      </Togglable>:
      <div>
        <LoggedInStatus user={user} setUser={setUser}/>
        <Togglable buttonLabel='new note' ref={noteFormRef}>
          <NewNoteForm createNote={addNote}/>
        </Togglable>
      </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} 
          note={note} 
          toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App