import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import UserManageTab from './UserManageTab'
import { scheduleApi } from '../misc/ScheduleApi'
import { handleLogError } from '../misc/Helpers'

function UserManagePage() {
  const Auth = useAuth()
  const user = Auth.getUser()

  const [users, setUsers] = useState([])
  const [userUsernameSearch, setUserUsernameSearch] = useState('')
  const [isAdmin, setIsAdmin] = useState(true)
  const [isUsersLoading, setIsUsersLoading] = useState(false)

  useEffect(() => {
    setIsAdmin(user.data.rol[0] === 'ADMIN')
    handleGetUsers()
  }, [])

  const handleInputChange = (e, { name, value }) => {
    if (name === 'userUsernameSearch') {
      setUserUsernameSearch(value)
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

  const handleToggleUserStatus = async (username, isActive) => {
    try {
      await scheduleApi.toggleUserStatus(user, username, isActive)
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

  if (!isAdmin) {
    return <Navigate to='/login' />
  }

  return (
    <Container>
      <UserManageTab
        isUsersLoading={isUsersLoading}
        users={users}
        userUsernameSearch={userUsernameSearch}
        handleDeleteUser={handleDeleteUser}
        handleToggleUserStatus={handleToggleUserStatus}
        handleSearchUser={handleSearchUser}
        handleInputChange={handleInputChange}
      />
    </Container>
  )
}

export default UserManagePage
