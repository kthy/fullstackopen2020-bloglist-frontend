import axios from 'axios'
const baseUrl = '/api/login'

const login = async (userObj) => {
  const response = await axios.post(baseUrl, userObj)
  return response.data
}

const logout = () => {
  console.log('TODO: logout')
}

export default { login, logout }
