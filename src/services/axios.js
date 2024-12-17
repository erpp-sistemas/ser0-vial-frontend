import axios from 'axios'
import { mode } from '../config/credentials'

axios.defaults.withCredentials = true

export const instance = axios.create({
	withCredentials: true,
	baseURL: mode === 'prod' ? 'https://erpp.center/waterloo/api/' : 'http://localhost:3007/api/',
	credentials: 'include',
})