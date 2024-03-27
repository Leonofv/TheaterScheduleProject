import React from 'react'
import { Grid, Table, Header, Icon } from 'semantic-ui-react'
import ScheduleForm from './ScheduleForm'

function ScheduleTable({ schedules, scheduleDescription, handleInputChange, handleCreateSchedule }) {
  let scheduleList
  if (!schedules || schedules.length === 0) {
    scheduleList = (
      <Table.Row key='no-schedule'>
        <Table.Cell collapsing textAlign='center' colSpan='3'>Нет расписания</Table.Cell>
      </Table.Row>
    )
  } else {
    scheduleList = schedules.map(schedule => {
      return (
        <Table.Row key={schedule.id}>
          <Table.Cell>{schedule.id}</Table.Cell>
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
          <Grid.Column width='3'>
            <Header as='h2'>
              <Icon name='book' />
              <Header.Content>Расписание</Header.Content>
            </Header>
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

      <Table compact striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={5}>ID</Table.HeaderCell>
            <Table.HeaderCell width={5}>Created At</Table.HeaderCell>
            <Table.HeaderCell width={6}>Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {scheduleList}
        </Table.Body>
      </Table>
    </>
  )
}

export default ScheduleTable