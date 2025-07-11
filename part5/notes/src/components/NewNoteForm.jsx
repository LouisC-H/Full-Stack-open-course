import { useState } from 'react'

const NewNoteForm = ({createNote}) => {
  const [newNote, setNewNote] = useState('')

  const handleNoteChange = (event) => {setNewNote(event.target.value)}

    const addNote = (event) => {
      event.preventDefault()
      createNote({
        content: newNote,
        important: true
      })
      setNewNote('')
    }

  return (
  <div>
    <h2>Create a new note</h2>
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
        placeholder="write note content here"
      />
      <button type="submit">save</button>
    </form> 
  </div>
  )
}

export default NewNoteForm