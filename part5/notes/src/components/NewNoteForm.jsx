import { useState, useEffect } from 'react'
import noteService from '../services/notesDb'

const NewNoteForm = ({notes, setNotes}) => {
  const [newNote, setNewNote] = useState('')

  const handleNoteChange = (event) => {setNewNote(event.target.value)}

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService
      .create(noteObject)
      .then(returnedNote  => {
        setNotes(notes.concat(returnedNote ))
        setNewNote('')
      })
  }

  return (
  <form onSubmit={addNote}>
    <input
      value={newNote}
      onChange={handleNoteChange}
    />
    <button type="submit">save</button>
  </form> 
  )
}

export default NewNoteForm