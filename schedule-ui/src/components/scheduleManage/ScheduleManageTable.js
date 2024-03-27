import React from 'react'
import { Grid, Form, Button, Input, Table } from 'semantic-ui-react'
import ScheduleForm from '../schedule/ScheduleForm'

function ScheduleMangeTable({ schedules, scheduleDescription, scheduleTextSearch, handleInputChange, handleCreateSchedule, handleDeleteSchedule, handleSearchSchedule }) {
  let scheduleList
  if (schedules.length === 0) {
    scheduleList = (
      <Table.Row key='no-schedule'>
        <Table.Cell collapsing textAlign='center' colSpan='5'> Расписания нет</Table.Cell>
      </Table.Row>
    )
  } else {
    scheduleList = schedules.map(schedule => {
      return (
        <Table.Row key={schedule.id}>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              onClick={() => handleDeleteSchedule(schedule.id)}
            />
          </Table.Cell>
          <Table.Cell>{schedule.id}</Table.Cell>
          <Table.Cell>{schedule.user.username}</Table.Cell>
          <Table.Cell>{schedule.createdAt}</Table.Cell>
          <Table.Cell>{schedule.description}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='5'>
            <Form onSubmit={handleSearchSchedule}>
              <Input
                action={{ icon: 'search' }}
                name='scheduleTextSearch'
                placeholder='Search by Id or Description'
                value={scheduleTextSearch}
                onChange={handleInputChange}
              />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <ScheduleForm
              scheduleDescription={scheduleDescription}
              handleInputChange={handleInputChange}
              handleCreateSchedule={handleCreateSchedule}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} />
            <Table.HeaderCell width={5}>ID</Table.HeaderCell>
            <Table.HeaderCell width={2}>Username</Table.HeaderCell>
            <Table.HeaderCell width={4}>Created At</Table.HeaderCell>
            <Table.HeaderCell width={4}>Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {scheduleList}
        </Table.Body>
      </Table>
    </>
  )
}

export default ScheduleMangeTable