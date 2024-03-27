import React, { useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'
import { scheduleApi } from '../misc/ScheduleApi'
import { handleLogError } from '../misc/Helpers'

function UserManageCreate() {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [CreateSuccess, setCreateSuccess] = useState(false);

  const handleInputChange = (e, {name, value}) => {
    if (name === 'username') {
      setUsername(value)
    } else if (name === 'password') {
      setPassword(value)
    } else if (name === 'firstName') {
      setFirstName(value)
    } else if (name === 'fatherName') {
      setFatherName(value)
    } else if (name === 'lastName') {
      setLastName(value)
    } else if (name === 'email') {
      setEmail(value)
    } else if (name === 'phoneNumber') {
      setPhoneNumber(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!(firstName && fatherName && lastName && username && password)) { 
      setIsError(true)
      setErrorMessage('Пожалуйста, заполните все обязательные поля!')
      return
    }

    try {
      const user = { username, password, firstName, fatherName, lastName, phoneNumber, email };
      await scheduleApi.createUser(user);
    
      setUsername('')
      setPassword('')
      setFirstName('')
      setFatherName('')
      setLastName('')
      setPhoneNumber('')
      setEmail('')
      setIsError(false)
      setCreateSuccess(true);
      setErrorMessage('')
    } catch (error) {
      handleLogError(error)
      if (error.response && error.response.data) {
        const errorData = error.response.data
        let errorMessage = 'Invalid fields'
        if (errorData.status === 409) {
          errorMessage = errorData.message
        } else if (errorData.status === 400) {
          errorMessage = errorData.errors[0].defaultMessage
        }
        setIsError(true)
        setErrorMessage(errorMessage)
      }
    }
  }

  if (CreateSuccess) {
    return <Navigate to="/user-management" />;
  }

  return (
    <Grid textAlign='center'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              name='lastName'
              icon='id badge outline'
              iconPosition='left'
              placeholder='Фамилия'
              value={lastName}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              name='firstName'
              icon='id badge outline'
              iconPosition='left'
              placeholder='Имя'
              value={firstName}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              name='fatherName'
              icon='id badge outline'
              iconPosition='left'
              placeholder='Отчество'
              value={fatherName}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              autoFocus
              name='username'
              icon='user'
              iconPosition='left'
              placeholder='Логин'
              value={username}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              name='phoneNumber'
              icon='mobile alternate'
              iconPosition='left'
              placeholder='Номер телефона'
              value={phoneNumber}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              name='email'
              icon='envelope'
              iconPosition='left'
              placeholder='Email'
              value={email}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              name='password'
              icon='lock'
              iconPosition='left'
              placeholder='Пароль'
              type='password'
              value={password}
              onChange={handleInputChange}
            />            
            <Button positive fluid size='large'>Добавить пользователя</Button>
          </Segment>
        </Form>
        <Message>{`Возникли проблемы при добавлении? `}
          <NavLink to="/help" color='blue' as={NavLink}>Помощь</NavLink>
        </Message>
        {isError && <Message negative>{errorMessage}</Message>}
      </Grid.Column>
    </Grid>
  )
}

export default UserManageCreate