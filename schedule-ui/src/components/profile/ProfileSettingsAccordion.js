import React, { useState } from 'react';
import { Accordion, Form, Button } from 'semantic-ui-react';
import ProfileSettingsModal from './ProfileSettingsModal';

function ProfileSettingsAccordion({ userMe, modalOpen, setModalOpen, handleUpdateUser, handleToggleEmailNotifications, handleChangePassword, oldPassword, setOldPassword, newPassword, setNewPassword }) {

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
              <Form.Checkbox label='Присылать уведомления по Email' />
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

  return (
    <>
      <Accordion as={Form.Field} panels={panels} styled fluid />
      <ProfileSettingsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        oldPassword={oldPassword}
        setOldPassword={setOldPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        handleChangePassword={handleChangePassword}
      />
    </>
  );
}

export default ProfileSettingsAccordion;
