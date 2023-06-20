import { Container, Text, Card } from "@nextui-org/react";
import { Postpone } from "./postpone";

export function SummonDetails({ juror }) { 
    return (
        <Container>
            <Container>
            <h1>Summon Details</h1>
            <Text>Badge Number: {juror.BadgeNumber}</Text>
            <Text>Pin Code: {juror.PinCode}</Text>
            <Text>Summon Date: {juror.SummonDate}</Text>
            <Text>First Name: {juror.FirstName}</Text>
            <Text>Last Name: {juror.LastName}</Text>
            <Text>Reporting Location: {juror.ReportingLocation}</Text>
                {(juror.CanPostpone) ? <Postpone /> : (<div><Text weight="bold">Cannot Postpone</Text></div>)}
            </Container>
        </Container>
    )
}
// default props

const today = new Date();
SummonDetails.defaultProps = {
    juror: {
        BadgeNumber: 0,
        PinCode: 0,
        SummonDate: "2023-06-19",
        FirstName: "",
        LastName: "",
        ReportingLocation: "King City Courthouse",
        CanPostpone: true,
    }
}


