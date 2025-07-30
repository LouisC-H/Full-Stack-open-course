import PropTypes from 'prop-types'

const LoggedInStatus = ({ user, setUser }) => {

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

LoggedInStatus.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
}

export default LoggedInStatus