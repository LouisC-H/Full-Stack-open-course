import { useState } from 'react'
import loginService from '../services/login'
import noteService from '../services/notesDb'
import PropTypes from 'prop-types'

const LoginForm = ({setUser, setErrorMessage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }    
  }

  return (
    <div>
      <h2>Login</h2>
      
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>      
    </div>
  )
}

LoginForm.propTypes = {
  setUser : PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
}

export default LoginForm