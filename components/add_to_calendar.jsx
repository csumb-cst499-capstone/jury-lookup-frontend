import { Text, Container, Grid, Button, Link } from "@nextui-org/react";
const { google, outlook, office365, yahoo, ics } = require("calendar-link");

export function AddToCalendar(props) {
  const event = {
    title: "Jury Service",
    description: "Summoned for jury service",
    start: new Date(props.SummonsDate),
    duration: [8, "hour"],
    location: props.ReportingLocation,
  };

  return (
    <Container>
      <Text weight="bold">Add to your calendar:</Text>
      <Grid.Container gap={2} justify="center">
        <Grid>
          <Link target="_blank" href={google(event)}>
            <Button sm>Google Calendar</Button>
          </Link>
        </Grid>

        <Grid>
          <Link target="_blank" href={outlook(event)}>
            <Button sm>Outlook</Button>
          </Link>
        </Grid>

        <Grid>
          <Link target="_blank" href={ics(event)}>
            <Button sm>iCal</Button>
          </Link>
        </Grid>
      </Grid.Container>
    </Container>
  );
}

export default AddToCalendar;
