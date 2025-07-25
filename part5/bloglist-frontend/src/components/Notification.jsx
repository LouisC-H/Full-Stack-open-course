import PropTypes from 'prop-types'

const Notification = ({ message, isError }) => {

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  }

  if (isError) {
    return(
      <div className='error' style={errorStyle}>
        {message}
      </div>
    )
  }

  return (
    <div className='notification' style={notificationStyle}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool.isRequired
}

export default Notification