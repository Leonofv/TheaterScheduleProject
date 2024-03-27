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
  const [currentPassword, setCurrentPassword] = useState('');
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
  

  const handlePasswordChange = (e, { name, value }) => {
    if (name === 'currentPassword') {
      setCurrentPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    }
  };

  const handlePasswordApply = () => {
    setModalOpen(false);
    setCurrentPassword('');
    setNewPassword('');
  };

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
        handlePasswordChange={handlePasswordChange}
        handlePasswordApply={handlePasswordApply}
        currentPassword={currentPassword}
        newPassword={newPassword}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleUpdateUser={handleUpdateUser}
        userEmailStatus={userEmailStatus}
        handleToggleEmailNotifications={handleToggleEmailNotifications}
      />
    </Container>
  )
}

export default ProfileSettingsPage
