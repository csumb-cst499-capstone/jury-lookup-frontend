
'use client';
import { Container, Grid } from '@nextui-org/react';
import { Homepage } from '../components/homepage';
import Login from '../components/Login';

export default function Page() {
  return (
    <Container fluid>
      <Grid.Container gap={2} justify="center">
        <Homepage />
        <Login />
      </Grid.Container>
    </Container>
  );
}
