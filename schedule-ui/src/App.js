import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import PrivateRoute from './components/misc/PrivateRoute'
import Navbar from './components/misc/Navbar'
import About from './components/home/About'
import Help from './components/home/Help'
import Login from './components/home/Login'
import UserManageCreate from './components/UserManage/UserManageCreate'
import ScheduleManagePage from './components/scheduleManage/ScheduleManagePage'
import SchedulePage from './components/schedule/SchedulePage'
import ProfileHelp from './components/profile/ProfileHelp'
import UserMangePage from './components/UserManage/UserManagePage'
import ProfileSettingsPage from './components/profile/ProfileSettingsPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/help' element={<Help />} />
          <Route path='/login' element={<Login />} />
          <Route path="/schedule-management" element={<PrivateRoute><ScheduleManagePage /></PrivateRoute>} />
          <Route path="/schedule" element={<PrivateRoute><SchedulePage /></PrivateRoute>} />
          <Route path="/profile-settings" element={<PrivateRoute><ProfileSettingsPage /></PrivateRoute>} />
          <Route path="/profile/help" element={<PrivateRoute><ProfileHelp /></PrivateRoute>} />
          <Route path="/user-management" element={<PrivateRoute><UserMangePage /></PrivateRoute>} />
          <Route path='/user-management/create' element={<PrivateRoute><UserManageCreate /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
