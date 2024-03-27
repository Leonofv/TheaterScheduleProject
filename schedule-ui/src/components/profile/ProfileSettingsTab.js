import React from 'react'
import { Tab, Form } from 'semantic-ui-react'
import ProfileSettingsDeteilsForm from './ProfileSettingsDeteilsForm'
import ProfileSettingsAccordion from './ProfileSettingsAccordion';

function ProfileSettingsTab(props) {
  const { userMe, handleUpdateUser, handleToggleEmailNotifications, userEmailStatus, currentPassword, newPassword, handlePasswordChange, handlePasswordApply, modalOpen, setModalOpen } = props

  const panes = [
    {
      menuItem: { key: 'users', icon: 'cogs', content: 'Общая информация' },
      render: () => (
        <Tab.Pane >
          <Form>
            <ProfileSettingsDeteilsForm
              userMe={userMe}
              userEmailStatus={userEmailStatus}
            />
              <ProfileSettingsAccordion 
              userMe={userMe} 
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              handleUpdateUser={handleUpdateUser}
              currentPassword={currentPassword}
              newPassword={newPassword}
              handlePasswordChange={handlePasswordChange}
              handlePasswordApply={handlePasswordApply}
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