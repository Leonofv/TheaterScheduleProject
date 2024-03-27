import React from 'react'
import { Statistic, Grid, Segment} from 'semantic-ui-react'

function About() {

  return (
      <Grid textAlign='center'>
        <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Segment >
              <Statistic>
                <Statistic.Label>Hello World!</Statistic.Label>
              </Statistic>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  )
}

export default About