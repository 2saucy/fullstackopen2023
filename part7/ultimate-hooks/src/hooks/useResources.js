import { useEffect, useState } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl)
      .then(response => setResources(response.data))
      .catch(err => console.error(err))
  },[baseUrl])

  const create = (resource) => {
    axios.post(baseUrl, resource)
      .then(response => {
        setResources([...resources, response.data])
      })
      .catch(err => console.error(err))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}