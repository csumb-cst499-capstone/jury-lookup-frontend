'use client'
import { Container, Grid } from '@nextui-org/react'
import { SummonDetails } from '@/components/summon_details'

export default function Page() {
  return (
    
    <Container fluid >
      <Grid.Container gap={2} justify="center">
        <SummonDetails />
      </Grid.Container>
    </Container>
  
  )
}