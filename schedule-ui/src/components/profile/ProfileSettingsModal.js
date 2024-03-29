import React from 'react';
import { Form, Button, Modal } from 'semantic-ui-react';

function ChangePasswordModal({ modalOpen, setModalOpen, oldPassword, setOldPassword, newPassword, setNewPassword, handleChangePassword }) {

  const handleCloseModal = () => { // Почему-то не работает в Page (оставил пока тут) 
    setModalOpen(false);
  };

  return (
    <Modal onClose={handleCloseModal} open={modalOpen}>
      <Modal.Header>Изменение пароля</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Старый пароль</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Новый пароль</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleCloseModal}>Отмена</Button>
        <Button
          content="Подтвердить"
          onClick={() => {
            handleChangePassword(oldPassword, newPassword);
            handleCloseModal();
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default ChangePasswordModal;
