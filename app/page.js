'use client'
import { Container, Grid } from '@nextui-org/react'
import { Greeting } from '../components/greeting'
import Login from '@/components/login'

export default function Page() {
  return (
    
    <Container fluid >
      <Grid.Container gap={2} justify="center">
        <Login />
      </Grid.Container>
    </Container>
  
  )
}
