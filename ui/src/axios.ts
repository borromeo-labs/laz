import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.API_URL,
  headers: { Authorization: `Bearer ${process.env.OAUTH_FAKE_TOKEN}` }
})

export { instance as axios }
