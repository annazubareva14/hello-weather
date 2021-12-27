import axios from 'axios'
import { BASE_URL } from '../constants'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  validateStatus (status) {
    return status < 400
  }
})

export default instance
