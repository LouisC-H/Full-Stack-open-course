const LoggedInStatus = ({user, setUser}) => {

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  return (
  <div>
    {user.name} logged-in  
    <button onClick={() => handleLogout()}>
      logout
    </button>
  </div>
  )
}

export default LoggedInStatus