import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'

function ScheduleForm({ scheduleDescription, handleInputChange, handleCreateSchedule }) {
  const createBtnDisabled = scheduleDescription.trim() === ''
  return (
    <Form onSubmit={handleCreateSchedule}>
      <Form.Group>
        <Form.Input
          name='sheduleDescription'
          placeholder='Description *'
          value={scheduleDescription}
          onChange={handleInputChange}
        />
        <Button icon labelPosition='right' disabled={createBtnDisabled}>
          Create<Icon name='add' />
        </Button>
      </Form.Group>
    </Form>
  )
}

export default ScheduleForm