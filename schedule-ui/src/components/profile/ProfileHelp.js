import React from 'react'
import { Statistic, Grid, Segment} from 'semantic-ui-react'

function ProfileHelp() {

  return (
      <Grid textAlign='center'>
        <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Segment >
              <Statistic>
                <Statistic.Label>Help my account!</Statistic.Label>
              </Statistic>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  )
}

export default ProfileHelp