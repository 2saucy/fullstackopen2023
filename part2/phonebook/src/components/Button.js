import React from 'react'

const Button = ({ name, id, deletePerson }) => {
    
  const handleClick = () => {
    if (window.confirm(`Delete ${name} ?`)) {
      deletePerson(id)
    }
  }

  return <button className='btn-delete' onClick={() => { handleClick() }}>Delete</button>
}

export default Button