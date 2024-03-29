import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import { scheduleApi } from '../misc/ScheduleApi'
import { handleLogError } from '../misc/Helpers'
import ProfileSettingsTab from './ProfileSettingsTab'

function ProfileSettingsPage() {
  
  const Auth = useAuth()
  const user = Auth.getUser()
  
  const [userMe, setUserMe] = useState('')
  const [modalOpen, setModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userEmailStatus, setUserEmailStatus] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await scheduleApi.getUserMe(user);
        setUserMe(response.data);
        
        const activationStatus = {};
        activationStatus[response.data.username] = response.data.isEmailSubscribed;
        setUserEmailStatus(activationStatus);
      } catch (error) {
        handleLogError(error);
      }
    }
  
    fetchData();
  }, [user]);
  

  const handleUpdateUser = async (username) => {
    try {
      await scheduleApi.updateUser(user, username)
      
    } catch (error) {
      handleLogError(error)
    }
  }

  const handleToggleEmailNotifications = async (username, isActive) => {
    try {
      await scheduleApi.toggleUserEmail(user, username, isActive)
      
    } catch (error) {
      handleLogError(error)
    }
  }

  if (!Auth) {
    return <Navigate to='/login' />
  }

  return (
    <Container>
      <ProfileSettingsTab
        userMe={userMe}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        oldPassword={oldPassword}
        setOldPassword={setOldPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        handleUpdateUser={handleUpdateUser}
        userEmailStatus={userEmailStatus}
        handleToggleEmailNotifications={handleToggleEmailNotifications}
      />
    </Container>
  )
}

export default ProfileSettingsPage
