import React from 'react'
import { Tab } from 'semantic-ui-react'
import UserTable from './UserTable'
import ScheduleManageTable from './ScheduleManageTable'

function ScheduleManageTab(props) {
  const { handleInputChange } = props
  const { isUsersLoading, users, userUsernameSearch, handleDeleteUser, handleSearchUser } = props
  const { schedules, scheduleDescription, scheduleTextSearch, handleCreateSchedule, handleDeleteSchedule, handleSearchSchedule } = props

  const panes = [
    {
      menuItem: { key: 'users', icon: 'calendar outline', content: 'День' },
      render: () => (
        <Tab.Pane loading={isUsersLoading}>
          <UserTable
            users={users}
            userUsernameSearch={userUsernameSearch}
            handleInputChange={handleInputChange}
            handleDeleteUser={handleDeleteUser}
            handleSearchUser={handleSearchUser}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'schedules', icon: 'calendar minus outline', content: 'Неделя' },
      render: () => (
        <Tab.Pane>
          <ScheduleManageTable
            schedules={schedules}
            scheduleDescription={scheduleDescription}
            scheduleTextSearch={scheduleTextSearch}
            handleInputChange={handleInputChange}
            handleCreateOrder={handleCreateSchedule}
            handleDeleteOrder={handleDeleteSchedule}
            handleSearchOrder={handleSearchSchedule}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'schedules', icon: 'calendar alternate outline', content: 'Месяц' },
      render: () => (
        <Tab.Pane>
          <ScheduleManageTable
            schedules={schedules}
            scheduleDescription={scheduleDescription}
            scheduleTextSearch={scheduleTextSearch}
            handleInputChange={handleInputChange}
            handleCreateSchedule={handleCreateSchedule}
            handleDeleteSchedule={handleDeleteSchedule}
            handleSearchSchedule={handleSearchSchedule}
          />
        </Tab.Pane>
      )
    }
  ]

  return (
    <Tab menu={{ attached: 'top' }} panes={panes} />
  )
}

export default ScheduleManageTab