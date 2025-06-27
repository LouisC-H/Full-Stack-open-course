const LoggedInStatus = ({user, setUser}) => {

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogsAppUser')
    setUser(null)
  }

  return (
  <p>
    {user.name} logged-in  
    <button onClick={() => handleLogout()}>
      logout
    </button>
  </p>
  )
}

export default LoggedInStatus