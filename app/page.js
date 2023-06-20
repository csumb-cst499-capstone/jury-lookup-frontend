'use client'
import { Container, Grid } from '@nextui-org/react'
import { Greeting } from '../components/greeting'
import Login from '../components/Login';

export default function Page() {
  return (
    
    <Container fluid >
      <Grid.Container gap={2} justify="center">
        <Greeting />
        <Login />
      </Grid.Container>
    </Container>
  
  )
}
