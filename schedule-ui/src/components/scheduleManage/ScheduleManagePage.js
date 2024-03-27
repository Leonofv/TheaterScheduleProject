import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import ScheduleManageTab from './ScheduleManageTab'
import { scheduleApi } from '../misc/ScheduleApi'
import { handleLogError } from '../misc/Helpers'

function ScheduleManagePage() {

  const Auth = useAuth()
  const user = Auth.getUser()

  const [users, setUsers] = useState([])
  const [schedules, setSchedules] = useState([])
  const [scheduleDescription, setScheduleDescription] = useState('')
  const [scheduleTextSearch, setScheduleTextSearch] = useState('')
  const [userUsernameSearch, setUserUsernameSearch] = useState('')
  const [isAdmin, setIsAdmin] = useState(true)
  const [isUsersLoading, setIsUsersLoading] = useState(false)

  useEffect(() => {
    setIsAdmin(user.data.rol[0] === 'ADMIN')
    handleGetUsers()
    handleGetSchedules()
  }, [])

  const handleInputChange = (e, { name, value }) => {
    if (name === 'scheduleDescription') {
      setScheduleDescription(value)
    } else if (name === 'scheduleTextSearch') {
      setScheduleTextSearch(value)
    }
  }

  const handleGetUsers = async () => {
    setIsUsersLoading(true)
    try {
      const response = await scheduleApi.getUsers(user)
      setUsers(response.data)
    } catch (error) {
      handleLogError(error)
    } finally {
      setIsUsersLoading(false)
    }
  }

  const handleDeleteUser = async (username) => {
    try {
      await scheduleApi.deleteUser(user, username)
      handleGetUsers()
    } catch (error) {
      handleLogError(error)
    }
  }

  const handleSearchUser = async () => {
    const username = userUsernameSearch
    try {
      const response = await scheduleApi.getUsers(user, username)
      const data = response.data
      const users = data instanceof Array ? data : [data]
      setUsers(users)
    } catch (error) {
      handleLogError(error)
      setUsers([])
    }
  }

  const handleGetSchedules = async () => {
    try {
      const response = await scheduleApi.getSchedules(user)
      setSchedules(response.data)
    } catch (error) {
      handleLogError(error)
    } 
  }
  

  const handleDeleteSchedule = async (isbn) => {
    try {
      await scheduleApi.deleteSchedule(user, isbn)
      handleGetSchedules()
    } catch (error) {
      handleLogError(error)
    }
  }

  const handleCreateSchedule = async () => {
    let description = scheduleDescription.trim()
    if (!description) {
      return
    }

    const schedule = { description }
    try {
      await scheduleApi.createOrder(user, schedule)
      handleGetSchedules()
      setScheduleDescription('')
    } catch (error) {
      handleLogError(error)
    }
  }

  const handleSearchSchedule = async () => {
    const text = scheduleTextSearch
    try {
      const response = await scheduleApi.getSchedules(user, text)
      setSchedules(response.data)
    } catch (error) {
      handleLogError(error)
      setSchedules([])
    }
  }

  if (!isAdmin) {
    return <Navigate to='/' />
  }

  return (
    <Container>
      <ScheduleManageTab
        isUsersLoading={isUsersLoading}
        users={users}
        userUsernameSearch={userUsernameSearch}
        handleDeleteUser={handleDeleteUser}
        handleSearchUser={handleSearchUser}
        schedules={schedules}
        scheduleDescription={scheduleDescription}
        scheduleTextSearch={scheduleTextSearch}
        handleCreateSchedule={handleCreateSchedule}
        handleDeleteSchedule={handleDeleteSchedule}
        handleSearchSchedule={handleSearchSchedule}
        handleInputChange={handleInputChange}
      />
    </Container>
  )
}

export default ScheduleManagePage