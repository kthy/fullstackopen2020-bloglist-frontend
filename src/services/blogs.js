import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const clearToken = () => token = null
const setToken = (newToken) => token = `Bearer ${newToken}`

const create = async newObject => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const del = async id => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default {
  clearToken,
  create,
  del,
  getAll,
  setToken,
}
