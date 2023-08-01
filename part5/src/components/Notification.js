import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  const { message, error } = notification

  if(!message){
    return <></>
  }
  else{
    return(
      <>
        {
          error ? (
            <p className='error-notification'>{message}</p>
          ) : (
            <p className='success-notification'>{message}</p>
          )
        }
      </>
    )
  }
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default Notification