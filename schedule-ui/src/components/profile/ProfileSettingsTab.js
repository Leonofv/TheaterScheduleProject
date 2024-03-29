import React from 'react'
import { Tab, Form } from 'semantic-ui-react'
import ProfileSettingsCard from './ProfileSettingsCard'
import ProfileSettingsAccordion from './ProfileSettingsAccordion';

function ProfileSettingsTab(props) {
  const { userMe, handleUpdateUser, handleToggleEmailNotifications, userEmailStatus, oldPassword, setOldPassword, newPassword, setNewPassword, handleChangePassword, modalOpen, setModalOpen } = props

  const panes = [
    {
      menuItem: { key: 'users', icon: 'cogs', content: 'Общая информация' },
      render: () => (
        <Tab.Pane >
          <Form>
            <ProfileSettingsCard
              userMe={userMe}
              userEmailStatus={userEmailStatus}
            />
            <ProfileSettingsAccordion 
              userMe={userMe} 
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              oldPassword={oldPassword}
              setOldPassword={setOldPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              handleUpdateUser={handleUpdateUser}
              handleToggleEmailNotifications={handleToggleEmailNotifications}
            />
          </Form>
        </Tab.Pane>
      )
    },
  ]

  return (
    <Tab menu={{ borderless: true, attached: true, tabular: true }} panes={panes} />
  )
}

export default ProfileSettingsTab