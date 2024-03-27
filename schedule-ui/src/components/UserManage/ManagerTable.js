import React from 'react';
import { Grid, Form, Input, Table } from 'semantic-ui-react';


function ManagerTable({ users, userUsernameSearch, handleInputChange, handleSearchUser }) {

  let sortedUsers = users.slice() 
  .filter(user => user.role === "ADMIN")
  .sort((userA, userB) => userA.lastName.localeCompare(userB.lastName))
  

  let userList;
  if (users.length === 0) {
    userList = (
      <Table.Row key='no-user'>
        <Table.Cell collapsing textAlign='center' colSpan='6'>Список Администраторов пуст</Table.Cell>
      </Table.Row>
    );
  } else {
    userList = sortedUsers.map((user) => {
      return (
        <Table.Row key={user.id}>
          <Table.Cell collapsing></Table.Cell>
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
    </>
  );
}

export default ManagerTable
