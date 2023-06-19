'use client'
import { Container, Grid } from '@nextui-org/react'
// import { Greeting } from '../components/greeting'
import { Postpone } from '../components/postpone'

export default function Page() {
  return (
    
    <Container fluid >
      <Grid.Container gap={2} justify="center">
        <Postpone
         />
      </Grid.Container>
    </Container>
  
  )
}
