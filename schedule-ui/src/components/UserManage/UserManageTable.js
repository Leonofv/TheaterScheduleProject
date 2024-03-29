import React, { useState, useEffect } from 'react';
import { Grid, Form, Button, Input, Table, Modal, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

function UserManageTable({ users, userUsernameSearch, handleInputChange, handleDeleteUser, handleToggleUserStatus, handleSearchUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userActivationStatus, setUserActivationStatus] = useState({});

  let sortedUsers = users.slice() 
  .filter(user => user.role === "USER")
  .sort((userA, userB) => userA.lastName.localeCompare(userB.lastName))
  .sort((userA, userB) => {
    const statusA = userActivationStatus[userA.username];
    const statusB = userActivationStatus[userB.username];

    if (statusA && !statusB) return -1; 
    if (!statusA && statusB) return 1;  
    return 0; 
  });

  const openModal = (user) => { // Перенести в Page
    setUserToDelete(user);
    setModalOpen(true);
  };

  const closeModal = () => { // Перенести в Page
    setUserToDelete(null);
    setModalOpen(false);
  };

  useEffect(() => { // Перенести в Page
  const activationStatus = {};
  users.forEach(user => {
    activationStatus[user.username] = user.isActive;
  });
  setUserActivationStatus(activationStatus);
  }, [users]);

  let userList;
  if (users.length === 0) {
    userList = (
      <Table.Row key='no-user'>
        <Table.Cell collapsing textAlign='center' colSpan='7'>Список пользователей пуст</Table.Cell>
      </Table.Row>
    );
  } else {
    userList = sortedUsers.map((user) => {
      return (
        <Table.Row key={user.id}>
          <Table.Cell collapsing>
            <div>
              <Button
                color='red'
                attached='left'
                size='small'
                disabled={user.role === 'ADMIN'}
                onClick={() => openModal(user)}
              > 
              Удалить
              </Button>
              <Button
                color={userActivationStatus[user.username] ? 'green' : 'yellow'}
                size='small'
                attached='right'
                onClick={() => handleToggleUserStatus(user.username, userActivationStatus[user.username])}
              >
                {userActivationStatus[user.username] ? 'Вкл' : 'Выкл'}
              </Button>
            </div>
          </Table.Cell>
          <Table.Cell>{user.username}</Table.Cell>
          <Table.Cell>{user.lastName}</Table.Cell>
          <Table.Cell>{user.firstName}</Table.Cell>
          <Table.Cell>{user.fatherName}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.phoneNumber}</Table.Cell>
          <Table.Cell>{user.role}</Table.Cell>
        </Table.Row>
      );
    });
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='4'>
            <Form onSubmit={handleSearchUser}>
              <Input
                action={{ icon: 'search' }}
                name='userUsernameSearch'
                placeholder='Поиск по «User ID» '
                value={userUsernameSearch}
                onChange={handleInputChange}
              />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <NavLink to='/user-management/create'>
              <Button positive size='large'>
                Добавить{' '}
              </Button>
            </NavLink>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} />
            <Table.HeaderCell width={1}>User ID</Table.HeaderCell>
            <Table.HeaderCell width={1}>Фамилия</Table.HeaderCell>
            <Table.HeaderCell width={1}>Имя</Table.HeaderCell>
            <Table.HeaderCell width={1}>Отчество</Table.HeaderCell>
            <Table.HeaderCell width={1}>Email</Table.HeaderCell>
            <Table.HeaderCell width={1}>Номер телефона</Table.HeaderCell>
            <Table.HeaderCell width={1}>Роль</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{userList}</Table.Body>
      </Table>
      <Modal open={modalOpen} onClose={closeModal} size='small'>
        <Header content='Подтверждение удаления' />
        <Modal.Content>
          <p>Вы уверены, что хотите удалить пользователя {userToDelete && userToDelete.username}?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>
            Отмена
          </Button>
          <Button negative
            onClick={() => {
              handleDeleteUser(userToDelete.username);
              closeModal();
            }}
          > 
          Подтвердить
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default UserManageTable;
