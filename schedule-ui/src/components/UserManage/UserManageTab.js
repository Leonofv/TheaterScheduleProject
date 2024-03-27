import React from 'react'
import { Tab } from 'semantic-ui-react'
import UserManageTable from './UserManageTable'
import ManagerTable from './ManagerTable'

function UserManageTab(props) {
  const { handleInputChange } = props
  const { users, userUsernameSearch, handleDeleteUser, handleToggleUserStatus, handleSearchUser } = props

  const panes = [
    {
      menuItem: { key: 'users', icon: 'address card', content: 'Сотрудники' },
      render: () => (
        <Tab.Pane >
          <UserManageTable
            users={users}
            userUsernameSearch={userUsernameSearch}
            handleInputChange={handleInputChange}
            handleDeleteUser={handleDeleteUser}
            handleToggleUserStatus={handleToggleUserStatus}
            handleSearchUser={handleSearchUser}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'manager', icon: 'user circle', content: 'Администраторы' },
      render: () => (
        <Tab.Pane >
          <ManagerTable
            users={users}
            userUsernameSearch={userUsernameSearch}
            handleInputChange={handleInputChange}
            handleSearchUser={handleSearchUser}
          />
        </Tab.Pane>
      )
    }
  ]

  return (
    <Tab menu={{ attached: 'top' }} panes={panes} />
  )
}

export default UserManageTab