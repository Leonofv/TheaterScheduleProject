import React from 'react';
import { Accordion, Form, Button, FormCheckbox } from 'semantic-ui-react';

function ProfileSettingsAccordion({ userMe, setModalOpen }) {
  const panels = [
    {
      key: 'privacy',
      title: 'Настройки приватности',
      content: {
        content: (
          <Form>
            <Form.Field>
              <label>Email</label>
              <input placeholder='' />
            </Form.Field>
            <Form.Field>
              <FormCheckbox label='Присылать уведомления по Email' />
            </Form.Field>
            <Form.Field>
              <label>Номер телефона</label>
              <input placeholder='' />
            </Form.Field>
            <Form.Field>
              <a href="#" onClick={() => setModalOpen(true)}>Изменение пароля</a>
            </Form.Field>
            <Button>Применить</Button>
          </Form>
        ),
      },
    },
  ];  

  return ( <Accordion as={Form.Field} panels={panels} styled fluid />
  );
}

export default ProfileSettingsAccordion;
