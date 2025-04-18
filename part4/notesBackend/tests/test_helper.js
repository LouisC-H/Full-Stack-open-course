const Note = require('../models/note')
const User = require('../models/user')

const initialUser = {
  username: 'test',
  name: 'Test User',
  password: 'aksunryfvlwasujhernlkasyuh',
}

const initialiseNotes = async () => {
  const userId = await findUserId()

  return [
    {
      content: 'HTML is easy',
      important: false,
      userId : userId,
    },
    {
      content: 'Browser can execute only JavaScript',
      important: true,
      userId: userId,
    }
  ]
}

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const findNoteID = async () => {
  const notesList = await notesInDb()

  return notesList[0].id
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const findUserId = async () => {
  const usersList = await usersInDb()
  return usersList[0].id
}

module.exports = {
  initialiseNotes, initialUser, nonExistingId, notesInDb, findNoteID, usersInDb, findUserId
}