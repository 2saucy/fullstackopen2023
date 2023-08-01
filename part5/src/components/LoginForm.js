import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    login(username, password)
    setUsername('')
    setPassword('')
  }
  const handleChangeUsername = (event) => {
    setUsername(event.target.value)
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>username:</label>
          <input type="text" onChange={handleChangeUsername} value={username} />
        </div>
        <div>
          <label>password:</label>
          <input type="password" onChange={handleChangePassword} value={password} />
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm