import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Menu, Dropdown, Label, DropdownMenu } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { getUser, userIsAuthenticated, userLogout } = useAuth()

  const logout = () => {
    userLogout()
  }

  const enterMenuStyle = () => {
    return userIsAuthenticated() ? { "display": "none" } : { "display": "block" }
  }

  const logoutMenuStyle = () => {
    return userIsAuthenticated() ? { "display": "block" } : { "display": "none" }
  }

  const adminPageStyle = () => {
    const user = getUser()
    return user && user.data.rol[0] === 'ADMIN' ? { "display": "block" } : { "display": "none" }
  }

  const getUsername = () => {
    const user = getUser()
    return user ? user.data.sub : ''
  }

  return (
    <Menu inverted color='teal' stackable size='massive' style={{ borderRadius: 0 }}>
      <Container>
          <Menu.Menu position='left'>
          <Menu.Item header>TheaterScheduel</Menu.Item>
          <Menu.Item as={Link} exact='true' style={enterMenuStyle()} to="/about">О системе</Menu.Item>
          <Menu.Item as={Link} to="/userpage" style={logoutMenuStyle()}>Расписание</Menu.Item>
          <Menu.Item as={Link} to="/adminpage" style={adminPageStyle()}>Мероприятия</Menu.Item>
          <Menu.Item as={Link} to="/user-management" style={logoutMenuStyle()}>Пользователи</Menu.Item>
        </Menu.Menu>
        <Menu.Menu position='right'>
          <Menu.Item as={Link} to="/login" style={enterMenuStyle()}>Войти</Menu.Item>
          <Menu.Item as={Link} to="/registration" style={enterMenuStyle()}>Регистрация</Menu.Item>
        <Dropdown style={logoutMenuStyle()} text='Мой профиль' pointing className='link item'>
          <DropdownMenu>
          <Label color='teal' ribbon size='large'> {`${getUsername()}`}</Label>
          <Menu.Item as={Link} exact='true' style={logoutMenuStyle()} to="/profile-settings">Настройки</Menu.Item>
          <Menu.Item as={Link} exact='true' to="/account/help">Помощь</Menu.Item>
          <Menu.Item as={Link} to="/login" style={logoutMenuStyle()} onClick={logout}>Выход</Menu.Item>
          </DropdownMenu>
        </Dropdown>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default Navbar
