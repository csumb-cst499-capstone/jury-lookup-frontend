'use client'
import { Container, Grid } from '@nextui-org/react'
import { Greeting } from '../components/greeting'

export default function Page() {
  return (
    
    <Container fluid >
      <Grid.Container gap={2} justify="center">
        <Greeting />
      </Grid.Container>
    </Container>
  
  )
}