import { Container, Text } from "@nextui-org/react";
import { Postpone } from "./postpone";
export function SummonDetails({ juror }) { 
    return (
        <Container>
            <h1>Summon Details</h1>
            <Text>Badge Number: {juror.BadgeNumber}</Text>
            <Text>Pin Code: {juror.PinCode}</Text>
            <Text>Summon Date: {juror.SummonDate}</Text>
            <Text>First Name: {juror.FirstName}</Text>
            <Text>Last Name: {juror.LastName}</Text>
            <Text>Reporting Location: {juror.ReportingLocation}</Text>
            {(juror.CanPostpone) ? <Postpone props={ juror } /> : (<Text>Cannot Postpone</Text>)}
        </Container>
    )
}

