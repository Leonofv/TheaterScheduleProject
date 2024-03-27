import axios from 'axios'
import { config } from '../../Constants'
import { parseJwt } from './Helpers'

export const scheduleApi = {
  authenticate,
  getUsers,
  createUser, 
  updateUser,
  toggleUserStatus,
  deleteUser,
  getSchedules,
  deleteSchedule,
  createSchedule,
  getUserMe,
}

function authenticate(username, password) {
  return instance.post('/auth/authenticate', { username, password }, {
    headers: { 'Content-type': 'application/json' }
  })
}

function createUser(user) {
  return instance.post('/auth/create', user, {
    headers: {
      'Content-type': 'application/json',
    }
  })
}

function getUsers(user, username) {
  const url = username ? `/api/users/${username}` : '/api/users'
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function updateUser(user, username) {
  return instance.put(`/api/users/${username}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function toggleUserStatus(user, username, isActive) {
  const url = `/api/users/${username}/${isActive ? 'deactivate' : 'activate'}`
  return instance.post(url, {}, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function deleteUser(user, username) {
  return instance.delete(`/api/users/${username}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getSchedules(user, text) {
  const url = text ? `/api/orders?text=${text}` : '/api/shedules'
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function deleteSchedule(user, scheduleId) {
  return instance.delete(`/api/schedules/${scheduleId}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function createSchedule(user, schedules) {
  return instance.post('/api/schedules', schedule, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}

function getUserMe(user) {
  return instance.get('/api/users/me', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

instance.interceptors.request.use(function (config) {
  if (config.headers.Authorization) {
    const token = config.headers.Authorization.split(' ')[1]
    const data = parseJwt(token)
    if (Date.now() > data.exp * 1000) {
      window.location.href = "/login"
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

function bearerAuth(user) {
  return `Bearer ${user.accessToken}`
}
