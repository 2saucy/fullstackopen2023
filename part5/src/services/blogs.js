import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = ( newToken ) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const res = axios.get(baseUrl)
  return res.then(res => res.data)
}

const create = (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = axios.post('/api/blogs', newBlog, config)
  return res.then(res => res.data)
}

const update = (id, blogUpdate) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = axios.put(`/api/blogs/${id}`, blogUpdate, config)
  return res.then(res => res.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = axios.delete(`/api/blogs/${id}`, config)
  return res.then(res => res.data)
}

export default { getAll, create, update, remove, setToken }