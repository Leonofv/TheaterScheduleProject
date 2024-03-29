import React from 'react';
import { Grid, GridColumn, Image, Segment } from 'semantic-ui-react';


function ProfileSettingsCard({ userMe, handleUpdateUser, handleToggleEmailNotifications, userEmailStatus, currentPassword, newPassword, handlePasswordChange, handlePasswordApply, modalOpen, setModalOpen }) {

  const userImage = 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg'; 

  return (
    <>
      <Grid stackable divided>
        <GridColumn>
          <Segment.Group horizontal>
              <Image src={userImage} size='small' style={{ width: '185px', height: '185px', borderRadius: '0' }} />
            <Segment >
              <p><strong>ФИО: </strong> {userMe.lastName} {userMe.firstName} {userMe.fatherName}</p>
              <p><strong>Email: </strong> {userMe.email}</p>
              <p><strong>Уведомления: </strong> {userEmailStatus[userMe.username] ? 'Вкл' : 'Выкл'}</p>
              <p><strong>Номер телефона: </strong> {userMe.phoneNumber}</p>
              <p><strong>Должность: </strong> {userMe.role}</p>
            </Segment>
          </Segment.Group>
        </GridColumn>
      </Grid>
    </>
  );
}

export default ProfileSettingsCard;
